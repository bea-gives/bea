import css from './index.css' assert { type: 'css' }

export class BeaNonprofitLabelElement extends HTMLElement {
  static get observedAttributes() {
    return ['name']
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets = [css]
    this.shadowRoot.innerHTML = `
      <div id="name"></div>
    `
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'name':
        this.shadowRoot.querySelector('#name').textContent = newValue
        break
    }
  }

  get name() {
    return this.getAttribute('name')
  }

  set name(value) {
    this.setAttribute('name', value)
  }
}

customElements.define('bea-nonprofitlabel', BeaNonprofitLabelElement)
