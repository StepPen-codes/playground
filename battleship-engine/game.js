//////////////////////
// GLOBAL VARIABLES //
//////////////////////

let game = new Battleship(7,5)
let map = []
let round = 1
let note = ''
let moves = []

///////////////
// FUNCTIONS //
///////////////

function newmap(){
  let size=game.size
  map=[]
  moves=[]
  round=1
  game.newmap()
  while(size--){
    map.push(' _ ')
  }
}
function show(msg,arr){
  let display=`${msg} \n`
  for (let y=0;y<game.y;y++){
    for (let x=0;x<game.x;x++)
      display+=`${arr[ x + (game.x*y) ]} `
    display+='\n'
  }
  return display
}
function watch(bool,msg){
  if(bool) console.log(msg,'successful!')
  else     console.log(msg,'failed!')
  return bool
}
function makeGuess(guess){
  let ret = false
  let valid
  if (guess.toLowerCase().trim()=='exit') ret=true
  guess = parseInt(guess)
  valid=0<guess<game.size
  if(valid && !moves.includes(guess)){
    moves.push(guess)
    if(game.checkPosition(guess)) ret = hit(guess)
    else miss(guess)
    round++
  }
  return ret
}
function hit(position){
  let sunk = game.hitShip(position)
  map[position]=' O'// When a ship is hit it will appear as an 'O'
  note = "It's a HIT!!!"
  return !game.checkShip(sunk)?sunkShip(sunk):false
}
function miss(position){
  map[position]=' X'// When a ship is missed guess will appear as an 'X'
  note = "It's a miss!"
  return false
}
function sunkShip(id){
  note = 'You sunk a ship'
  game.ships.splice(game.ships.indexOf(id),1)
  return game.ships.length<1
}
function newRandomMap(battleships){
  for (let ships in battleships)
    while(true)
      if(watch(game.placeShip(ships, random(game.size), battleships[ships], random(2)?'horizontal':'vertical'),`Ship '${ships}' placement`)) break;
}
function random(num){
  return Math.floor(Math.random()*num)
}
function init(){
  newmap() // make a map
  newRandomMap({
    A:3, // ID:size
    B:2,
    C:4,
    D:1,
    E:5
  })
}
function startGame(){
  while(true){
    if(makeGuess(prompt(promptMSG()))) break;
  }
  if(game.ships.length<1) alert('You successfully sunk all the ships!!!')
}
function promptMSG(){
  return `note:Type 'exit' to stop\nRound#${round} ${show(note,map)}Pick a number from 0 to ${game.size-1}`
}
