class dropDown extends HTMLElement{
  #template = document.createElement('template')  
  constructor(){
    super()
    
    this.#template.innerHTML = 
      `<style>
        .drop-down-container{
          display:inline-block;
        }
        .menu{
          width:100%;
          height:
        }
        input{
          width:100%;
        }
      </style>
      <div class='container'>
        <input class='input-field' type='text'>
        <div class="menu"></div>
      </div>`
    
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(this.#template.content.cloneNode(true))
    if (this.hasAttribute('placeholder'))
      this.shadowRoot.querySelector('input').setAttribute('placeholder',               this.getAttribute('placeholder'))
  }
}

window.customElements.define('drop-down', dropDown) 
