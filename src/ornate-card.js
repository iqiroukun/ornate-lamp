import { LitElement, html, css } from 'lit';

class OrnateCard extends LitElement {
    static get tag() {
        return 'ornate-card';
    }

    static properties = {
        header: { type: String },
        description: { type: String },
        bgimage: { type: String }
    }

    constructor() {
        super();
        this.header = "This is the title";
        this.description = "This is the description";
    }

    static styles = css`

    @import url('https://fonts.cdnfonts.com/css/didot-2');

    :host {
    display: block;
    }
    .card-wrapper {
        height: 1080px;
        width: 720px;
        background-color: whitesmoke;
    }
    .header-wrapper {
        font-family: 'Didot', sans-serif;
        font-size: 100pt;
    }

    `;

    render() {
        return html`

        <div class="card-wrapper">
            <img src="${this.bgimage}">
        </div>

        <div class="header-wrapper">
            <h1>${this.header}</h1>
        </div>

        

        `;
    }
}

customElements.define(OrnateCard.tag, OrnateCard);