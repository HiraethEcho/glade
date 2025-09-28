document.addEventListener('DOMContentLoaded', function() {
    const sideBarBtn = document.querySelector('.sidebar-btn');
    const sideBar = document.querySelector('.sidebar');
    sideBarBtn.addEventListener('click', function() {
        sideBar.classList.toggle('active');
    });

    const siteNav = document.querySelector('.site-nav');
    const siteNavBtn = document.querySelector('.site-nav-btn');
    siteNavBtn.addEventListener('click', function() {
        siteNav.classList.toggle('active');
        if (siteNavBtn.textContent === '▼') {
            siteNavBtn.textContent = '◀';
        } else {
            siteNavBtn.textContent = '▼';
        }
    });
});
