import cssColors from '@beagives/bea-color/index.css' assert { type: 'css' }
import css from './index.css' assert { type: 'css' }
import '@beagives/bea-font/index.js'

export class BeaTextFieldElement extends HTMLElement {
  #inputElement
  #options
  #optionsElement

  static get observedAttributes() {
    return ['placeholder', 'value', 'defaultValue', 'autocomplete', 'options']
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).innerHTML = `<input>
<div id="options" hidden></div>`
    this.shadowRoot.adoptedStyleSheets = [cssColors, css]

    this.#inputElement = this.shadowRoot.querySelector('input')
    this.#optionsElement = this.shadowRoot.querySelector('#options')

    this.addEventListener('input', (event) => {
      const value = this.value.toLowerCase()
      for (const child of this.#optionsElement.children) {
        child.hidden = !child.dataset.value.toLowerCase().includes(value)
      }
    })

    this.addEventListener('focus', (event) => {
      this.#optionsElement.hidden = false
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'placeholder':
      case 'autocomplete':
        this.#inputElement[name] = newValue
        break
      case 'value':
        this.defaultValue = newValue
        if (!this.value) this.value = newValue
        break
      case 'options':
        this.options = JSON.parse(newValue)
        break
    }
  }

  get value() {
    return this.#inputElement.value
  }

  set value(value) {
    this.#inputElement.value = value
  }

  get defaultValue() {
    return this.getAttribute('defaultValue')
  }

  set defaultValue(value) {
    this.setAttribute('defaultValue', value)
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

  #onOptionClick = (event) => {
    this.#optionsElement.hidden = true
    this.value = event.currentTarget.dataset.value
    this.dispatchEvent(new Event('change'))
  }

  get options() {
    return this.#options
  }

  set options(value) {
    this.#options = value
    for (const child of this.#optionsElement.children) {
      child.removeEventListener('click', this.#onOptionClick)
    }
    this.#optionsElement.innerHTML = ''
    for (const option of this.#options) {
      this.#optionsElement.insertAdjacentHTML('beforeend', `<div class="option" data-value="${option.value}">
  <div class="optionthumbnail" style="background-image:url(${option.thumbnail})"${option.thumbnail ? '' : 'hidden'}></div>
  <div class="optionvalue">${option.value}</div>
  <div class="optioncontent">${option.content}</div>
</div>`)
    }
    for (const child of this.#optionsElement.children) {
      child.addEventListener('click', this.#onOptionClick)
    }
  }
}

window.customElements.define('bea-textfield', BeaTextFieldElement)
