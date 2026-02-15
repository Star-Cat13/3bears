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