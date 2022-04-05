import { getLabelData } from '@beagives/bea-api/index.js';

import css from './index.css' assert { type: 'css' }

export class BeaNPOLabelElement extends HTMLElement {
  #logoElement

  static get observedAttributes() {
    return ['name']
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets = [css]
    this.shadowRoot.innerHTML = `
      <a id="logo" target="_blank"></a>
    `

    this.#logoElement = this.shadowRoot.querySelector('#logo')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'name':
        this.#loadLabel()
        break
    }
  }

  async #loadLabel() {
    const labelData = await getLabelData(this.name)
    this.#logoElement.style.backgroundImage = labelData.logoURL ? `url(${labelData.logoURL})` : ''
    this.#logoElement.href = labelData.websiteURL ?? ''
    this.#logoElement.title = labelData.name
  }

  get name() {
    return this.getAttribute('name')
  }

  set name(value) {
    this.setAttribute('name', value)
  }
}

customElements.define('bea-npolabel', BeaNPOLabelElement)
