class Tipi extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="row room-pics">
            <div class="column">
                <img src="https://raw.githubusercontent.com/Star-Cat13/3bears/main/public/tipi/2024_bear_tipi.jpg" onclick="openModal(); currentSlide(1);" class="hover-shadow" />
            </div>
            <div class="column">
                <img src="https://raw.githubusercontent.com/Star-Cat13/3bears/main/public/tipi/2024_bear_tipi_bed.jpg" onclick="openModal(); currentSlide(2);" class="hover-shadow" />
            </div>
        </div>
        <div class="row room-pics">
            <div class="column">
                <img src="https://raw.githubusercontent.com/Star-Cat13/3bears/main/public/tipi/2024_horse_tipi_bed.jpg" onclick="openModal(); currentSlide(3);" class="hover-shadow" />
            </div>
            <div class="column">
        <img src="https://raw.githubusercontent.com/Star-Cat13/3bears/main/public/tipi/2024_horse_tipi.jpg" onclick="openModal(); currentSlide(4);" class="hover-shadow" />
            </div>
        </div>

            <div id="myModal" class="modal">
            <span class="close cursor" onclick="closeModal()">&times;</span>
                <div class="modal-content">

                    <div class="mySlides">
                        <div class="numbertext">1 / 4</div>
                        <img src="https://raw.githubusercontent.com/Star-Cat13/3bears/main/public/tipi/2024_bear_tipi.jpg" style="width: 100%;"  />
                        
                    </div>

                    <div class="mySlides">
                        <div class="numbertext">2 / 4</div>
                        <img src="https://raw.githubusercontent.com/Star-Cat13/3bears/main/public/tipi/2024_bear_tipi_bed.jpg" style="width: 100%;"  />
                        
                    </div>

                    <div class="mySlides">
                        <div class="numbertext">3 / 4</div>
                        <img src="https://raw.githubusercontent.com/Star-Cat13/3bears/main/public/tipi/2024_horse_tipi_bed.jpg" style="width: 100%;"  />
                        
                    </div>

                    <div class="mySlides">
                        <div class="numbertext">4 / 4</div>
                        <img src="https://raw.githubusercontent.com/Star-Cat13/3bears/main/public/tipi/2024_horse_tipi.jpg" style="width: 100%;"  />
                        
                    </div>


                    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                    <a class="next" onclick="plusSlides(1)">&#10095;</a>

                   
                    <div class='thumbnails-container'>
            <div class="column">
                <img class="demo" src="https://raw.githubusercontent.com/Star-Cat13/3bears/main/public/tipi/2024_bear_tipi_400x284.jpg" onclick="currentSlide(2);" alt="" />
            </div>
            <div class="column">
                <img class="demo" src="https://raw.githubusercontent.com/Star-Cat13/3bears/main/public/tipi/2024_bear_tipi_bed_400x284.jpg" onclick="currentSlide(2);" alt="" />
            </div>
            <div class="column">
                <img class="demo" src="https://raw.githubusercontent.com/Star-Cat13/3bears/main/public/tipi/2024_horse_tipi_bed_400x284.jpg" onclick="currentSlide(3);" alt="" />
            </div>
            <div class="column">
                <img class="demo" src="https://raw.githubusercontent.com/Star-Cat13/3bears/main/public/tipi/2024_horse_tipi_400x284.jpg" onclick="currentSlide(4);" alt="" />
            </div>
        </div>

                </div>
            </div>
      `;
    }
}

customElements.define('tipi-component', Tipi);