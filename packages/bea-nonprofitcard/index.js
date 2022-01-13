import cssColors from '@beagives/bea-color/index.css' assert { type: 'css' }
import css from './index.css' assert { type: 'css' }
import '@beagives/bea-icon/index.js'
import '@beagives/bea-font/index.js'

export class BeaNonprofitCardElement extends HTMLElement {
  #labels
  #organizationNumber
  #additionalNumbers
  #locations

  #logoElement
  #labelsElement
  #descriptionElement
  #fullNameElement
  #organizationNumberElement
  #addressElement
  #additionalNumbersElement

  static get observedAttributes() {
    return ['logo', 'name', 'fullname', 'organizationnumber', 'address', 'labels']
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets = [cssColors, css]
    this.shadowRoot.innerHTML = `<div id="logocontainer"><div id="logo"></div></div>
<div>
  <div id="name"></div>
  <div id="fullname"></div>
  <a id="organizationnumber" target="_blank"></a>
  <div id="additionalnumbers"></div>
</div>
<a id="address" target="_blank"></a>
<div id="labels"></div>
<div id="description"></div>`

    this.#logoElement = this.shadowRoot.querySelector('#logo')
    this.#labelsElement = this.shadowRoot.querySelector('#labels')
    this.#addressElement = this.shadowRoot.querySelector('#address')
    this.#descriptionElement = this.shadowRoot.querySelector('#description')
    this.#fullNameElement = this.shadowRoot.querySelector('#fullname')
    this.#organizationNumberElement = this.shadowRoot.querySelector('#organizationnumber')
    this.#additionalNumbersElement = this.shadowRoot.querySelector('#additionalnumbers')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return
    switch (name) {
      case 'labels':
        this.labels = newValue?.split(' ')
        break
      case 'logo':
        this.#logoElement.style.backgroundImage = newValue ? `url(${newValue})` : ''
        break
      default:
        this.shadowRoot.querySelector(`#${name}`).textContent = newValue
        break
    }
  }

  get name() {
    return this.getAttribute('name')
  }

  set name(value) {
    this.setAttribute('name', value)
  }

  get description() {
    return this.#descriptionElement.textContent
  }

  set description(value) {
    this.#descriptionElement.textContent = value
  }

  get fullName() {
    return this.#fullNameElement.textContent
  }

  set fullName(value) {
    this.#fullNameElement.textContent = value
  }

  get organizationNumber() {
    return this.#organizationNumber
  }

  set organizationNumber(value) {
    this.#organizationNumber = value
    this.#organizationNumberElement.innerHTML = this.#organizationNumber ? `Siret: ${this.#organizationNumber}` : ''
  }

  get locations() {
    return this.#locations
  }

  set locations(value) {
    this.#locations = value
    this.#addressElement.href = `http://maps.google.com/?q=${this.#locations[0].address}`
    this.#addressElement.innerHTML = this.#locations.length ? `<bea-icon icon="pin"></bea-icon>${this.#locations[0].address}<br>(${this.#locations.length} locations)` : ''
  }

  get logo() {
    return this.getAttribute('logo')
  }

  set logo(value) {
    this.setAttribute('logo', value)
  }

  get organizationNumberLink() {
    return this.#organizationNumberElement.href
  }

  set organizationNumberLink(value) {
    this.#organizationNumberElement.href = value
  }

  get labels() {
    return this.#labels
  }

  set labels(value) {
    this.#labelsElement.innerHTML = ''
    this.#labels = value
    if (!this.#labels) return
    for (const label of this.#labels) {
      const labelElement = document.createElement('bea-label')
      labelElement.name = label
      this.#labelsElement.appendChild(labelElement)
    }
  }

  get additionalNumbers() {
    return this.#additionalNumbers
  }

  set additionalNumbers(value) {
    this.#additionalNumbers = value
    this.#additionalNumbersElement.innerHTML = ''
    if (!this.#additionalNumbers) return
    for (const [key, value] of Object.entries(this.#additionalNumbers)) {
      this.#additionalNumbersElement.insertAdjacentHTML('beforeend', `${key.toUpperCase()}: ${value}`)
    }
  }
}

customElements.define('bea-nonprofitcard', BeaNonprofitCardElement)
