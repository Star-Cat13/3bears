class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="topnav" id="myTopnav">
        <a href="./index.html" class="nav-brand" aria-label="Home">
            <img class="nav-logo" src="./public/icon.svg" alt="Three Bears Motel" />
        </a>
        <a href="./index.html" class="nav-link">Home</a>

        <a href="./contact.html" class="nav-link">Contact</a>
        <a href="./about.html" class="nav-link">About</a>
        <a href="javascript:void(0);" class="icon" onclick="myFunction()">
            <i class="fas fa-bars"></i>
        </a>
    </div>

    <div class="title">
        <h1>Three Bears Motel Lincoln, MT</h1>
        <p class="address">
            <a href="https://maps.app.goo.gl/Pc46ezY46T4S3izV8" target="_blank" rel="noopener noreferrer"
                aria-label="Open Three Bears Motel in Google Maps">
                MT HWY 200<br> 203 Main St. Lincoln, Montana 59639
            </a>
        </p>
        
        <a class="book-now-cta" href="tel:+14063624355" aria-label="Call to book now">
            Call to Book Now
        </a>
        <p class="phoneNumber">
            <a href="tel:+14063624355">(406) 362-4355</a>
        </p>
    </div>
    
      `;

        const getBasename = (pathname) => {
            const parts = String(pathname).split('/').filter(Boolean);
            return parts[parts.length - 1] || 'index.html';
        };

        const current = getBasename(window.location.pathname);
        const links = this.querySelectorAll('.topnav a.nav-link');
        links.forEach((a) => {
            const href = a.getAttribute('href') || '';
            const target = getBasename(new URL(href, window.location.href).pathname);
            a.classList.toggle('active', target === current);
        });
    }
}

customElements.define('header-component', Header);