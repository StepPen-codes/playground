class dropDown{
    #dataset = []
  dropDown(element, events=undefined){
    this.node = element
    this.events = events
    if (events != undefined && typeof this.events === 'object')
      for (let e of this.events) 
        this.node.addEventListener(e, 
          function(event){
            this.events[e](this.#dataset)
          })
  }
  get dataset(){
    return this.#dataset
  }
  push(data){
    if (Array.isArray(data))
      for (let item of data)
        this.#dataset.push(item)
    else
      this.#dataset.push(data)
  }
  clear(){
    this.#dataset = []
  }
}
