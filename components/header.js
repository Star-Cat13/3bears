class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="topnav" id="myTopnav">
        <a href="./index.html" class="active">Home</a>

        <a href="./contact.html">Contact</a>
        <a href="./about.html">About</a>
        <a href="javascript:void(0);" class="icon" onclick="myFunction()">
            <i class="fa fa-bars"></i>
        </a>
    </div>

    
      `;
    }
}

customElements.define('header-component', Header);