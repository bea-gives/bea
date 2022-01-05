/**
 * @hideconstructor
 * @example
 * <bea-icon></bea-icon>
 */
window.customElements.define('bea-icon', class extends HTMLElement {
  static get observedAttributes() {
    return ['icon']
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).innerHTML = `<style>
  :host {
    --stroke-width: 1px;
    --size: 25px;
    --icon-size: 100%;
    display: block;
    position: relative;
    width: var(--size);
    height: var(--size);
    box-sizing: border-box;
    color: black;
  }

  :host([type=fill]), :host([type=stroke]) {
    --icon-size: 33%;
    border-radius: 50%;
  }
  
  :host([type=fill]) {
    color: white;
    background-color: black;
    filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.1));
  }

  :host([type=stroke]) {
    border: var(--stroke-width) solid;
  }

  :host([type=fill]) path {
    stroke: white;
  }

  #icon-container {
    display: contents;
    padding: inherit;
  }

  svg {
    padding: inherit;
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  svg * {
    stroke-width: var(--stroke-width);
    vector-effect: non-scaling-stroke;
    fill: currentColor;
  }

  :host([type=fill]) svg, :host([type=stroke]) svg {
    width: var(--icon-size);
    height: var(--icon-size);
  }
</style>
<div id="icon-container"></div>`

    this._iconContainer = this.shadowRoot.querySelector('#icon-container')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'icon':
        this._loadIcon(newValue)
        break
    }
  }

  async _loadIcon(icon) {
    const svg = await fetch(`node_modules/@beagives/bea-icon/${icon}.svg`).then((response) => response.text())
    this._iconContainer.innerHTML = svg
  }

  get icon() {
    return this.getAttribute('icon')
  }

  set icon(value) {
    this.setAttribute('icon', value)
  }
})
