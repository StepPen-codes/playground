////////////
// ENGINE //
////////////

class Battleship{ // engine by StepPen-codes
  constructor(x,y){
    this.x=x
    this.y=y
    this.size=x*y
    this.map=[]
    this.ships=[]
    
    this.newmap()
  }
  newmap(){
    let i=this.size
    this.ships=[] // reset ships array
    while(i--)
      this.map[i]="0" //resets map array
  }
  hitShip(position){
    let id = this.map[position]
    this.map[position]="0"
    return id
  }
  checkShip(id){
    return this.map.includes(id)
  }
  checkPosition(position){
    return this.map[position]!="0"
  }
  placeShip(id, position, size, orientation = 'horizontal'){
    let posY=Math.floor(position/this.x)
    let posX=position%this.x
    let placed=false

    if (!this.ships.includes(id)) {
      switch(orientation){
        case 'horizontal':
          if(size + posX <= this.x){
            placed = this.setShip(id, position, size, 1)
            }
        break;
        case 'vertical':
          if(size + posY <= this.y){
            placed = this.setShip(id, position, size, this.x)
          }
        break;
      }
      if(placed)this.ships.push(id) // setting ship is successful include ship in ships
    }
    return placed
  }
  setShip(id, position, size, adjustment){
    let ship=[], ret=true
    for(let i=0;i<size;i++){
      let pos= position+(i*adjustment)      
      if(!this.checkPosition(pos)) ship.push(pos)
      else {
        ret=false
        break;
      }
    }
    if (ret)
      for(let i of ship) this.map[i]=id
    return ret
  }
}
