import ColorCSSStyleSheet from '@beagives/bea-color/index.css' assert { type: 'css' }
import '@beagives/bea-font/index.js'

export class BeaTextFieldElement extends HTMLElement {
  #input

  static get observedAttributes() {
    return ['placeholder', 'value']
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).innerHTML = `<style>
  :host {
    display: inline-block;
    position: relative;
    background-color: var(--bea-color-ivory);
    color: var(--bea-color-black);
    border-radius: 100px;
    font-family: Pangram, sans-serif;
  }
  
  :host(:hover) {
    outline: 1px solid var(--bea-color-lightblue);
  }
  
  :host(:focus-within) {
    outline: 2px solid var(--bea-color-lightblue);
  }
  
  input {
    width: 100%;
    height: 100%;
    padding: 15px 25px;
    font: inherit;
    box-sizing: border-box;
    border: none;
    border-radius: inherit;
    background-color: inherit;
  }

  input::placeholder {
    color: var(--bea-color-black);
    opacity: .3;
  }

  input:focus {
    outline: none;
  }
</style>
<input>`

    for (const rule of ColorCSSStyleSheet.cssRules) this.shadowRoot.styleSheets[0].insertRule(rule.cssText, 0)

    this.#input = this.shadowRoot.querySelector('input')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'placeholder':
        this.#input.placeholder = newValue
        break
      case 'value':
        this.#input.value = newValue
        break
    }
  }

  get value() {
    return this.#input.value
  }

  set value(value) {
    this.#input.value = value
  }
}

window.customElements.define('bea-textfield', BeaTextFieldElement)
