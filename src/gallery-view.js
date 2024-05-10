import { LitElement, html, css } from 'lit';

export class MyGallery extends LitElement {

    static get tag() {
        return 'gallery-view';
    }

    static get properties() {
        return {
            images: { type: Array },
            caption: { type: Array },
            slide: { type : Number },
            show: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.images = [
            "https://upload.wikimedia.org/wikipedia/en/8/8e/IST_Building_PSU.jpg",
            "https://bpb-us-e1.wpmucdn.com/sites.psu.edu/dist/5/117956/files/2020/05/Westgate-Bldg-5-052520.jpg",
            "https://i0.wp.com/images.onwardstate.com/uploads/2019/03/IMG_4096.jpeg?fit=4032%2C3024&ssl=1",
            "https://pbs.twimg.com/media/EkI_7v8XYAYqBO3.jpg",
            "https://vinoly.com/wp-content/uploads/2016/05/PSIST_1-1778x1000.jpg",
            "https://ericacfleming.com/wp-content/uploads/2021/11/Westgate-Sunny-scaled-e1636471162824-1024x581.jpg"
        ];
        this.caption = [
            "Westgate 1",
            "Westgate 2",
            "Westgate 3",
            "Westgate 4",
            "Westgate 5",
            "Westgate 6"
        ];
        this.slide = 0;
        this.show = false;
    }

    static get styles() {
        return css`
            :host {
                display: block;
                padding: 20px;
            }
            h1 {
                color: white;
            }
            .image-list {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                position: relative;
                margin-top: 20px;
            }
            .image-list img {
                width: calc(33% - 40px);
                margin-bottom: 20px;
                transition: transform 0.5s;
                border: white solid 2px;
                filter: grayscale(1);
                cursor: pointer;
            }
            .image-list img:hover {
                transform: scale(1.1);
                filter: grayscale(0);
            }
            #image-gallery {
                top: 0;
                position: absolute;
                margin: 128px;
                border-radius: 20px 20px 0 0;
                background-color: black;
                border: white solid 4px;
                display: none;
            }
            #image {
                display: block;
                margin: auto;
                height: 480px;
                width: 720px;
            }
            .close {
                cursor: pointer;
                top: 0;
                right: 0;
                color: white;
                background-color: red;
                border-radius: 0px 12px 0 0;
                font-weight: bold;
                font-size: 20px;
                padding: 8px;
                margin: 8px;
                border: white solid 2px;
                position: absolute;
            }
            .close:hover {
                color: red;
                background-color: white;
            }
            .back,
            .next {
                cursor: pointer;
                position: absolute;
                top: 40%;
                width: auto;
                padding: 16px;
                margin-top: -50px;
                color: white;
                font-weight: bold;
                font-size: 20px;
                border-radius: 0 10px 10px 0;
                background-color: grey;
                user-select: none;
                -webkit-user-select: none;
            }
            .next {
                right: 0;
                border-radius: 10px 0 0 10px;
            }
            .back:hover,
            .next:hover {
                color: black;
                background-color: white;
            }
            #image-number {
                color: black;
                background-color: white;
                border-radius: 12px 0 0 0;
                font-size: 16px;
                margin: 8px;
                padding: 8px;
                position: absolute;
                top: 0;
            }
            .caption-container {
                text-align: center;
                background-color: white;
                padding: 2px 16px;
                color: black;
            }
            .row:after {
                content: "";
                display: table;
                clear: both;
            }
            #column {
                float: left;
                width: 16.66%;
                display: inline-flex;
            }
            .thumbnail {
                opacity: 0.4;
                width: 100%;
                filter: grayscale(1);
            }
            .thumbnail:hover {
                cursor: pointer;
                opacity: 1;
            }
            .thumbnail.active{
                opacity: 1;
                filter: grayscale(0);
            }
        `;
    }

    render() {
        return html`
        <div class="image-list">
            ${this.images.map((image, index) => html`
                <img src="${image}" @click="${() => this.showSlides(index)}">
            `)}
        </div>
        <div id="image-gallery">
            <div class="image-wrapper">
                <div id="image-number">${this.slide + 1} / ${this.images.length}</div>
                <img id="image" src="${this.images[this.slide]}">
                <button class="close" @click=${this.toggleshow}>&times;</button>
            </div>

            <a class="back" @click="${this.backSlide}"> < </a>
            <a class="next" @click="${this.nextSlide}"> > </a>

            <div class="caption-container">
                <p id="caption">
                    ${this.caption[this.slide]}
                </p>
            </div>

            <div class="row">
                <div id="column">
                    ${this.images.map((image, index) => html`
                        <img class="thumbnail" src="${image}" @click="${() => this.showSlides(index)}">
                    `)}
                </div>
            </div>
        </div>
        `;
    }

    showSlides(index) 
    {
        if(!this.show){
            this.toggleshow();
        }
        if(this.show){
            this.slide = index;
            var thumbnailContainer = this.shadowRoot.getElementById("column");
            const thumbnail = thumbnailContainer.getElementsByClassName("thumbnail");
            const image = this.shadowRoot.getElementById("image");

            for (let i = 0; i < this.images.length; i++) {
                if(i === this.slide) {
                    image.src = this.images[i];
                    thumbnail[i].classList.add("active");
                }else{
                    thumbnail[i].classList.remove("active");
                }
            }
        }
    }

    backSlide() 
    {
        this.slide -= 1;

        if(this.slide === -1){
            this.slide = this.images.length - 1;
        }

        this.showSlides(this.slide);
    }

    nextSlide() 
    {
        this.slide += 1;

        if(this.slide === this.images.length){
            this.slide = 0;
        }

        this.showSlides(this.slide);
    }

    toggleshow(){
        if(this.show == true){
            this.shadowRoot.getElementById("image-gallery").style.display= 'none';
            this.show = false;
        }else{
            this.shadowRoot.getElementById("image-gallery").style.display = 'block';
            this.show = true;
        }
    }
}

globalThis.customElements.define(MyGallery.tag, MyGallery);