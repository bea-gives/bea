/**
 * @hideconstructor
 * @example
 * <bea-logo></bea-logo>
 */
window.customElements.define('bea-logo', class extends HTMLElement {
  constructor() {
    super()

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
    top: 52.5%;
    left: 50%;
    width: 50%;
    height: 50%;
    transform: translate(-50%, -50%);
  }

  :host([light]:not([icon])) path:nth-of-type(2) {
    fill: white;
  }

  :host([icon]:not([light])) path:nth-of-type(2) {
    fill: white;
  }

  :host([light]) #background {
    background-color: white;
  }
</style>
<div id="background"></div>`

    fetch('node_modules/@beagives/bea-logo/logo.svg').then((response) => response.text()).then((data) => {
      const template = document.createElement('template')
      template.innerHTML = data
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    })
  }
})
