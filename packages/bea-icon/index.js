/**
 * Entry point element
 * @hideconstructor
 * @example
 * <bea-icon></bea-icon>
 */
window.customElements.define('bea-icon', class extends HTMLElement {
  static get observedAttributes() {
    return ['icon'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' }).innerHTML = `<style>
  :host {
    --stroke-width: 1px;
    display: block;
    position: relative;
    width: 25px;
    height: 25px;
    box-sizing: border-box;
    color: black;
  }

  :host([type=fill]), :host([type=stroke]) {
    border-radius: 50%;
  }
  
  :host([type=fill]) {
    background-color: var(--color-blue);
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
    width: 60%;
    height: 60%;
  }
</style>
<div id="icon-container"></div>`;

    this._iconContainer = this.shadowRoot.querySelector('#icon-container');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'icon':
        this._loadIcon(newValue);
        break;
    }
  }

  async _loadIcon(icon) {
    const svg = await fetch(`node_modules/@bea-org/bea-icon/${icon}.svg`).then((response) => response.text());
    this._iconContainer.innerHTML = svg;
  }

  get icon() {
    return this.getAttribute('icon');
  }

  set icon(value) {
    this.setAttribute('icon', value);
  }
});
