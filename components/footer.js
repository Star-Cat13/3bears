class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
      <footer>
      <div class='footer-top'>
          <div class='hours'>
              <h2>COME ON IN!</h2>
              <span>Office Hours: 8 AM to 10 PM </span> <br />
              <span>OPEN YEAR ROUND <br />Excluding the first two weeks of December. </span>
          </div>
          <div class='contact'>
              <h2>CONTACT</h2>
              PHONE <br />(406) 362-4355<br />
              EMAIL <a href="mailto:threebearsmotel@gmail.com">threebearsmotel@gmail.com</a><br />
              ADDRESS <br />MT HWY 200<br />
                  203 Main St.<br />
                  Lincoln, Montana 59639
          </div>
      </div>
      <div class='links'>
          <h2>EXPLORE LINCOLN</h2>
          <div class='flags'>
          <img src='https://threebearsmotel.com/wp-content/uploads/2021/06/LincolnLogo-300x183.png' />
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_Montana.svg/1920px-Flag_of_Montana.svg.png' />
          </div>
  
          <ul>
              <li><a href="http://lincolnmontana.com/">Lincoln Valley Chamber of Commerce</a></li>

              <li><a href="http://lincolnmontana.com/events">Lincoln Montana Upcoming Events</a></li>

              <li><a href="http://www.sculptureinthewild.com/">Blackfoot Pathways Sculpture in the Wild</a></li>

              <li><a href="https://continentaldividetrail.org/trip-planning/">Continental Divide Trail</a></li>

              <li><a href="https://www.hicountry.com/">Hi-Country Snack Foods</a></li>
          </ul>
      </div>
<p>© Copyright threebearsmotel.com</p>

      `;
    }
}

customElements.define('footer-component', Footer);