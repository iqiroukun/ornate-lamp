import { LitElement, html, css } from 'lit';

class OrnateLamp extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
    :host {
      display: block;
    }
  `;

  constructor() {
    super();
    this.header = 'My app';
  }

  render() {
    return html`
      hello
    `;
  }
}

customElements.define('ornate-lamp', OrnateLamp);