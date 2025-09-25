document.addEventListener('DOMContentLoaded', function() {
    const sideBarBtn = document.querySelector('.sidebar-btn');
    const sideBar = document.querySelector('.sidebar');
    sideBarBtn.addEventListener('click', function() {
        sideBar.classList.toggle('active');
        if (sideBarBtn.textContent === '▼') {
            sideBarBtn.textContent = '▲';
        } else {
            sideBarBtn.textContent = '▼';
        }
    });

    const siteNav = document.querySelector('.site-nav');
    const siteNavBtn = document.querySelector('.site-nav-btn');
    siteNavBtn.addEventListener('click', function() {
        siteNav.classList.toggle('active');
    });
});
