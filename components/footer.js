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
              <span>Office Hours: 8 AM to 10 PM</span> <br />
              <span>Open year-round, except for the first two weeks of December.</span> <br /> <br />
              ADDRESS <br />MT HWY 200<br />
                  203 Main St.<br />
                  Lincoln, Montana 59639
          </div>
          <div class='contact'>
              <h2>CONTACT</h2>
              PHONE <br /><a href="tel:+14063624355">(406) 362-4355</a><br />
              EMAIL <br /><a href="mailto:threebearsmotel@gmail.com">threebearsmotel@gmail.com</a><br />
              MAILING ADDRESS <br />
              PO Box 995<br />
                  Lincoln, Montana 59639
              <br /><a href="https://www.facebook.com/3bearsmotel/"><i class="fab fa-2x fa-facebook"></i></a><br />
          </div>
      </div>
      <!--
      <div class='links'>
          <h2>EXPLORE LINCOLN</h2>
          <div class='flags'>
          </div>
  
          <ul>
              <li><a href="http://lincolnmontana.com/">Lincoln Valley Chamber of Commerce</a></li>

              <li><a href="http://lincolnmontana.com/events">Lincoln Montana Upcoming Events</a></li>

              <li><a href="http://www.sculptureinthewild.com/">Blackfoot Pathways Sculpture in the Wild</a></li>

              <li><a href="https://continentaldividetrail.org/trip-planning/">Continental Divide Trail</a></li>

              <li><a href="https://www.hicountry.com/">Hi-Country Snack Foods</a></li>
          </ul>
      </div>
      -->
<p style="text-align: center">© 2026 threebearsmotel.com </p>
      </footer>
      `;
    }
}

customElements.define('footer-component', Footer);