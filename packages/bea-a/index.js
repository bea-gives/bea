/**
 * Entry point element
 * @hideconstructor
 * @example
 * <bea-a></bea-a>
 */
window.customElements.define('bea-a', class extends HTMLElement {
  static get observedAttributes() {
    return ['href', 'target'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' }).innerHTML = `<style>
  :host {
    color: #6091FF;
    transition-property: color, text-shadow;
    transition-duration: .4s;
  }

  :host([selected]) {
    pointer-events: none;
  }

  :host([selected]),
  :host(:hover) {
    color: #3E66BF;
    text-shadow: 0 0 .5px currentColor, 0 0 .5px currentColor, 0 0 .5px currentColor;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
</style>
<a href="">
  <slot></slot>
</a>`;

    this._a = this.shadowRoot.querySelector('a');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'href':
      case 'target':
        this._a[name] = newValue;
        break;
      default:
        break;
    }
  }

  get href() {
    return this.getAttribute('href');
  }

  set href(value) {
    this.setAttribute('href', value);
  }

  get target() {
    return this.getAttribute('target');
  }

  set target(value) {
    this.setAttribute('target', value);
  }
});
