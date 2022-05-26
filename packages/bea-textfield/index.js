import cssColors from '@beagives/bea-color/index.css' assert { type: 'css' }
import css from './index.css' assert { type: 'css' }
import '@beagives/bea-font/index.js'

export class BeaTextFieldElement extends HTMLElement {
  #input
  #options
  #dataList

  static get observedAttributes() {
    return ['placeholder', 'value', 'autocomplete', 'options']
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).innerHTML = `<input list="datalist">
<datalist id="datalist"></datalist>`
    this.shadowRoot.adoptedStyleSheets = [cssColors, css]

    this.#input = this.shadowRoot.querySelector('input')
    this.#dataList = this.shadowRoot.querySelector('datalist')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'placeholder':
      case 'autocomplete':
      case 'value':
        this.#input[name] = newValue
        break
      case 'options':
        this.options = JSON.parse(newValue)
        break
    }
  }

  get value() {
    return this.getAttribute('value')
  }

  set value(value) {
    this.setAttribute('value', value)
  }

  get placeholder() {
    return this.getAttribute('placeholder')
  }

  set placeholder(value) {
    this.setAttribute('placeholder', value)
  }

  get autocomplete() {
    return this.getAttribute('autocomplete')
  }

  set autocomplete(value) {
    this.setAttribute('autocomplete', value)
  }

  get options() {
    return this.#options
  }

  set options(value) {
    this.#options = value
    this.#dataList.innerHTML = ''
    for (const option of this.#options) {
      this.#dataList.insertAdjacentHTML('beforeend', `<option value="${option.value}">${option.content}</option>`)
    }
  }
}

window.customElements.define('bea-textfield', BeaTextFieldElement)
