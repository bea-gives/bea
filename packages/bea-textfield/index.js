import ColorCSSStyleSheet from '@beagives/bea-color/index.css' assert { type: 'css' }

export class BeaTextFieldElement extends HTMLElement {
  #input

  static get observedAttributes() {
    return ['placeholder']
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).innerHTML = `<style>
  :host {
    display: block;
    position: relative;
    background-color: var(--bea-color-ivory);
    color: var(--bea-color-black);
    border-radius: 100px;
  }
  
  :host(:hover) {
    outline: 1px solid var(--bea-color-lightblue);
  }
  
  :host(:focus-within) {
    outline: 2px solid var(--bea-color-lightblue);
  }
  
  input {
    padding: 15px 25px;
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
    }
  }
}

window.customElements.define('bea-textfield', BeaTextFieldElement)
