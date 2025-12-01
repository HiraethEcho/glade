import * as params from "@params";

let fuse; // holds our search engine
let resList = document.getElementById("searchResults");
let sInput = document.getElementById("searchInput");
let first,
  last,
  current_elem = null;
let resultsAvailable = false;

let options = {
  distance: 50,
  threshold: 0.2,
  ignoreLocation: true,
  findAllMatches: false,
  keys: [
    { name: "file", weight: 0.8 },
    { name: "title", weight: 0.8 },
    { name: "summary", weight: 0.7 },
    { name: "tags", weight: 0.5 },
    { name: "categories", weight: 0.5 },
    { name: "content", weight: 0.4 },
  ],
};
if (params.fuseOpts) {
  options = {
    isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
    includeScore: params.fuseOpts.includescore ?? false,
    includeMatches: params.fuseOpts.includematches ?? false,
    minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
    shouldSort: params.fuseOpts.shouldsort ?? true,
    findAllMatches: params.fuseOpts.findallmatches ?? false,
    keys: params.fuseOpts.keys ?? [
      { name: "title", weight: 0.6 },
      { name: "file", weight: 0.8 },
      { name: "tags", weight: 0.5 },
      { name: "summary", weight: 0.7 },
      { name: "categories", weight: 0.5 },
      { name: "content", weight: 0.4 },
    ],
    location: params.fuseOpts.location ?? 0,
    threshold: params.fuseOpts.threshold ?? 0.4,
    distance: params.fuseOpts.distance ?? 100,
    ignoreLocation: params.fuseOpts.ignorelocation ?? true,
  };
}

// load our search index
window.onload = function () {
  fetch("/index.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        // fuse.js options; check fuse.js website for details
        fuse = new Fuse(data, options); // build the index from the json file
      }
    })
    .catch((error) => {
      console.log(error.message || "Failed to load search index");
    });
};

function activeToggle(ae) {
  document.querySelectorAll(".focus").forEach(function (element) {
    // rm focus class
    element.classList.remove("focus");
  });
  if (ae) {
    ae.focus();
    document.activeElement = current_elem = ae;
    ae.parentElement.classList.add("focus");
  } else {
    document.activeElement.parentElement.classList.add("focus");
  }
}

function reset() {
  resultsAvailable = false;
  resList.innerHTML = sInput.value = ""; // clear inputbox and searchResults
  sInput.focus(); // shift focus to input box
}

// execute search as each character is typed
sInput.onkeyup = function (e) {
  // run a search query (for "term") every time a letter is typed
  // in the search box
  if (fuse) {
    let results;
    if (params.fuseOpts) {
      results = fuse.search(this.value.trim(), {
        limit: params.fuseOpts.limit,
      }); // the actual query being run using fuse.js along with options
    } else {
      results = fuse.search(this.value.trim()); // the actual query being run using fuse.js
    }
    if (results.length !== 0) {
      for (let item in results) {
        const listItem = document.createElement("li");
        listItem.className = "side-entry";
        const link = document.createElement("a");
        link.className = "pagelink";
        link.href = results[item].permalink;
        link.textContent = results[item].title;
        const summary = document.createElement("p");
        summary.textContent = results[item].summary;
        listItem.appendChild(link);
        listItem.appendChild(summary);
        resList.appendChild(listItem);
      }

      // resList.innerHTML = resultSet;
      resultsAvailable = true;
      first = resList.firstChild;
      last = resList.lastChild;
    } else {
      resultsAvailable = false;
      resList.innerHTML = "";
    }
  }
};

sInput.addEventListener("search", function (e) {
  // clicked on x
  if (!this.value) reset();
});

// kb bindings
document.onkeydown = function (e) {
  let key = e.key;
  let ae = document.activeElement;

  let inbox = document.getElementById("searchbox").contains(ae);

  if (ae === sInput) {
    let elements = document.getElementsByClassName("focus");
    while (elements.length > 0) {
      elements[0].classList.remove("focus");
    }
  } else if (current_elem) ae = current_elem;

  if (key === "Escape") {
    reset();
  } else if (!resultsAvailable || !inbox) {
    return;
  } else if (key === "ArrowDown") {
    e.preventDefault();
    if (ae == sInput) {
      // if the currently focused element is the search input, focus the <a> of first <li>
      activeToggle(resList.firstChild.lastChild);
    } else if (ae.parentElement != last) {
      // if the currently focused element's parent is last, do nothing
      // otherwise select the next search result
      activeToggle(ae.parentElement.nextSibling.lastChild);
    }
  } else if (key === "ArrowUp") {
    e.preventDefault();
    if (ae.parentElement == first) {
      // if the currently focused element is first item, go to input box
      activeToggle(sInput);
    } else if (ae != sInput) {
      // if the currently focused element is input box, do nothing
      // otherwise select the previous search result
      activeToggle(ae.parentElement.previousSibling.lastChild);
    }
  } else if (key === "ArrowRight") {
    ae.click(); // click on active link
  }
};
