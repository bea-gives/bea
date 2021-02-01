/**
 * Entry point element
 * @hideconstructor
 * @example
 * <bea-logo></bea-logo>
 */
window.customElements.define('bea-logo', class extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' }).innerHTML = `<style>
  :host {
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
  }

  #background {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #6091FF;
  }

  :host([icon]) #background {
    display: block;
  }

  svg {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  :host([icon]) svg {
    left: 20%;
    top: 24%;
    width: 60%;
    height: 60%;
  }

  :host([light]:not([icon])) path:first-of-type {
    fill: white;
  }

  :host([icon]:not([light])) path:first-of-type {
    fill: white;
  }

  :host([light]) #background {
    background-color: white;
  }
</style>
<div id="background"></div>
<svg width="577" height="515" viewBox="0 0 577 515" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M560.108 71.5534C541.428 37.0715 430.908 -78.3952 288.096 88.7779L92.5563 304.144C88.1382 309.01 88.2861 316.644 92.8891 321.323L279.781 511.269C284.383 515.946 291.748 515.951 296.356 511.28L526.094 278.379C573.72 231.843 594.122 135.314 560.108 71.5534Z"
    fill="#6091FF" />
  <path
    d="M261.154 43.2483C263.795 45.7716 263.869 49.9183 261.481 52.6829C260.846 53.4189 260.21 54.1597 259.573 54.9052L56.6047 276.928C53.982 279.797 49.5124 279.99 46.7838 277.222C17.9151 247.932 1.90533e-06 207.091 0 161.912C-4.02145e-06 72.8008 69.6965 0.562138 155.672 0.562134C196.368 0.562132 233.417 16.7483 261.154 43.2483Z"
    fill="#FBD874" />
</svg>`;
  }
});
