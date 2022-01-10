import { html, css, LitElement } from 'lit'
import { cssColors } from '@beagives/bea-color/index.js'
import '@beagives/bea-icon/index.js'
import '@beagives/bea-font/index.js'

export class BeaNonprofitCardElement extends LitElement {
  static styles = [
    cssColors,
    css`:host {
  display: block;
  position: relative;
  width: 380px;
  background-color: var(--bea-color-white);
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  padding: 20px;
  border-radius: 15px;
  overflow: hidden;
  font-family: Pangram, sans-serif;
  font-size: 16px;
  box-sizing: border-box;
}

:host::before {
  content: '';
  z-index: 0;
  background-color: var(--bea-color-ivory);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
}

#content {
  display: grid;
  gap: 20px;
}

#logo {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  background: white;
  z-index: 1;
}

#name {
  font-weight: 700;
  font-size: 1.625em;
  color: var(--bea-color-black);
}

#fullname {
  color: var(--bea-color-grey);
}

#addresses {
  display: grid;
  gap: 5px;
  grid-template-columns: auto 1fr;
  align-items: center;
  font-family: Mulish, sans-serif;
  color: var(--bea-color-grey);
  font-weight: 800;
  font-size: 12px;
  text-transform: uppercase;
}

#addresses bea-icon {
  --size: 1.4em;
  --stroke-width: 2px;
  color: inherit;
}

#organizationnumbercontainer {
  color: var(--bea-color-grey);
}`,
  ]

  static properties = {
    name: { type: String },
    fullName: { type: String },
    address: { type: String },
    organizationNumber: { type: String },
    labels: { type: Array },
  }

  render() {
    return html`<div id="content">
  <div id="logo"></div>
  <div>
    <div id="name">${this.name}</div>
    <div id="fullname">${this.fullName}</div>
    <div id="organizationnumbercontainer">
      Siret: <span id="organizationnumber">${this.organizationNumber}</span>
    </div>
  </div>
  <div id="addresses">
    <bea-icon icon="pin"></bea-icon>
    <span id="address">${this.address}</span>
  </div>
  <div id="labels">${this.labels}</div>
</div>`
  }
}

window.customElements.define('bea-nonprofitcard', BeaNonprofitCardElement)
