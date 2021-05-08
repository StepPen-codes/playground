class dropDown extends HTMLElement{
  #template = document.createElement('template')
  #adjustMenuTop(){
    this.shadowRoot.querySelector('.menu').style.top=`${this.offsetHeight}px`
  }
  #hasDataSet = false
  #focusEvent(){}
  #blurEvent(){}
  #keyupEvent(){}
  constructor(){
    super()
    
    this.#template.innerHTML = 
      `<style>
        .container{
          position:relative;
          display:flex;
          gap:1ch;
        }
        .menu{
          height:0px;
          overflow:hidden;
        }
        .container::before{
          content:attr(label)
        }
        input{
          flex-grow:1;
        }
      </style>
      <div class='container' label='input'>
        <input class='input-field' type='text'>
      </div>
      <div class="menu"></div>`

    this.dataSet // object assigned to hold the data the drop-down will use

    this.attachShadow({mode: 'open'}) 

    this.shadowRoot.appendChild(this.#template.content.cloneNode(true))

    if (this.hasAttribute('placeholder')) // for placeholder attribute
      this.shadowRoot.querySelector('input').setAttribute('placeholder', this.getAttribute('placeholder'))
    
    if (this.hasAttribute('label')) // for label attribute
      this.shadowRoot.querySelector('div.container').setAttribute('label', this.getAttribute('label'))
    
    if (this.hasAttribute('data-set')){ // for data-set attribute responsible for assigning this.dataSet
      let temp = new Function(`return ${this.dataset.set}`)
      this.dataSet=temp()
      this.#hasDataSet=true
    }

    //events
    this.addEventListener('focus',this.#focusEvent,true)
    this.addEventListener('blur',this.#blurEvent,true)
    this.addEventListener('keyup',this.#keyupEvent)
  }
  addDropDownItem (name, value){
      this.dataSet.push({'name':name, 'value':value, 'score':0})
  }
}

window.customElements.define('drop-down', dropDown) 
