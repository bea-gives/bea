import cssColors from '@beagives/bea-color/index.css' assert { type: 'css' }
import css from './index.css' assert { type: 'css' }
import '@beagives/bea-font/index.js'

export class BeaTextFieldElement extends HTMLElement {
  #inputElement
  #options
  #optionsElement

  static get observedAttributes() {
    return ['placeholder', 'value', 'autocomplete', 'options']
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).innerHTML = `<input>
<div id="options"></div>`
    this.shadowRoot.adoptedStyleSheets = [cssColors, css]

    this.#inputElement = this.shadowRoot.querySelector('input')
    this.#optionsElement = this.shadowRoot.querySelector('#options')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'placeholder':
      case 'autocomplete':
      case 'value':
        this.#inputElement[name] = newValue
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
    this.#optionsElement.innerHTML = ''
    for (const option of this.#options) {
      this.#optionsElement.insertAdjacentHTML('beforeend', `<div class="option">
  <div class="optionthumbnail" style="background-image:url(${option.thumbnail})"${option.thumbnail ? '' : 'hidden'}></div>
  <div class="optionvalue">${option.value}</div>
  <div class="optioncontent">${option.content}</div>
</div>`)
    }
  }
}

window.customElements.define('bea-textfield', BeaTextFieldElement)
