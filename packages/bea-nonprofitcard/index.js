import cssColors from '@beagives/bea-color/index.css' assert { type: 'css' }
import css from './index.css' assert { type: 'css' }
import '@beagives/bea-icon/index.js'
import '@beagives/bea-font/index.js'

export class BeaNonprofitCardElement extends HTMLElement {
  #labelsContainer
  #labels

  static get observedAttributes() {
    return ['name', 'fullname', 'organizationnumber', 'address', 'labels']
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).innerHTML = `<div id="content">
    <div id="logo"></div>
    <div>
      <div id="name"></div>
      <div id="fullname"></div>
      <div id="organizationnumbercontainer">
        Siret: <span id="organizationnumber"></span>
      </div>
    </div>
    <div id="addresses">
      <bea-icon icon="pin"></bea-icon>
      <span id="address"></span>
    </div>
    <div id="labels"></div>
  </div>`

    this.shadowRoot.adoptedStyleSheets = [cssColors, css]

    this.#labelsContainer = this.shadowRoot.querySelector('#labels')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return
    switch (name) {
      case 'labels':
        this.labels = newValue?.split(' ')
        break
      default:
        this.shadowRoot.querySelector(`#${name}`).textContent = newValue
        break
    }
  }

  get labels() {
    return this.getAttribute('labels')
  }
  set labels(value) {
    this.#labelsContainer.innerHTML = ''
    this.#labels = value
    if (!this.#labels) return
    for (const label of this.#labels) {
      const labelElement = document.createElement('bea-label')
      labelElement.name = label
      this.#labelsContainer.appendChild(labelElement)
    }
  }

  get name() { return this.getAttribute('name') }
  set name(value) { this.setAttribute('name', value) }

  get fullName() { return this.getAttribute('fullname') }
  set fullName(value) { this.setAttribute('fullname', value) }

  get organizationNumber() { return this.getAttribute('organizationnumber') }
  set organizationNumber(value) { this.setAttribute('organizationnumber', value) }

  get address() { return this.getAttribute('address') }
  set address(value) { this.setAttribute('address', value) }
}

window.customElements.define('bea-nonprofitcard', BeaNonprofitCardElement)
