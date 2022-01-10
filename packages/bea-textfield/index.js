import cssColors from '@beagives/bea-color/index.css' assert { type: 'css' }
import css from './index.css' assert { type: 'css' }
import '@beagives/bea-font/index.js'

export class BeaTextFieldElement extends HTMLElement {
  #input

  static get observedAttributes() {
    return ['placeholder', 'value']
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).innerHTML = `<input>`
    this.shadowRoot.adoptedStyleSheets = [cssColors, css]

    this.#input = this.shadowRoot.querySelector('input')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'placeholder':
      case 'value':
        this.#input[name] = newValue
        break
    }
  }

  get value() { return this.#input.value }
  set value(value) { this.#input.value = value }
}

window.customElements.define('bea-textfield', BeaTextFieldElement)
