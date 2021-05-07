class dropDown extends HTMLElement{
  #template = document.createElement('template')  
  constructor(){
    super()
    
    this.#template.innerHTML = 
      `<style>
        
      </style>
      <input type='text'><div class="menu"></div>`
    
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(this.#template.content.cloneNode(true))
    if (this.hasAttribute('placeholder'))
      this.shadowRoot.querySelector('input').setAttribute('placeholder', this.getAttribute('placeholder'))
  }
}

window.customElements.define('drop-down', dropDown) 
