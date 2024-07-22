
const gameBoard = document.getElementById('gameBoard')
const context = gameBoard.getContext('2d')   // canvas tag - for drawing, color filling
const scoreText = document.getElementById('scoreVal');

const width = gameBoard.width  // width of game board
const height = gameBoard.height // heigth of game board
const unit = 25;

let foodX;
let foodY;
let xVel = 25;
let yVel = 0;
let score = 0;
let active = true;
let started = false;
let paused = false;

let snake = [
    {x:unit*3,y:0},
    {x:unit*2,y:0},
    {x:unit,y:0},
    {x:0,y:0}
];
window.addEventListener('keydown',keyPress)
startGame();

function startGame(){
   context.fillStyle ='#212121'
   // fillRect(x-axis-Start value,yStart,width,heigth)
   // context.fillRect(0,0,500,500) // instead of hardcore the value we use above width and height
   context.fillRect(0,0,width,height)
   createFood();   
   displayFood();
//    drawSnake();
//    moveSnake();
//    clearBoard();
   drawSnake();
    
}

function clearBoard(){
    context.fillStyle ='#212121'
    context.fillRect(0,0,width,height)
}


function createFood(){ // finding co-ordinates
    // Math.floor(Math.random()* width) --> display number btwn 0 to 499 (width[500]-1)
    // multiples of 25 from 0 t0 500
    // Math.floor(Math.random()* width/unit) --> 500/ 25 = 20; display 0 to 19
    // Math.floor(Math.random()* width/unit)*unit --> multiply the above value by 25
    foodX = Math.floor(Math.random()* width/unit)*unit;
    foodY = Math.floor(Math.random()* height/unit)*unit;

}

function displayFood(){
    context.fillStyle = 'red'
    context.fillRect(foodX,foodY,unit,unit)
}

function drawSnake(){
    context.fillStyle = 'aqua';
    context.strokeStyle = '#212121'
    snake.forEach((snakePart)=>{
        context.fillRect(snakePart.x,snakePart.y,unit,unit)
        context.strokeRect(snakePart.x,snakePart.y,unit,unit)
    })
}

function moveSnake(){
   const head = {x:snake[0].x+xVel, y:snake[0].y+yVel}
   snake.unshift(head) // add head at the top of array
   if(snake[0].x == foodX && snake[0].y == foodY){
     score += 1;
     scoreText.textContent = score;
     createFood();
   }
   else
     snake.pop()
}

function nextTick(){
  if(active && !paused){
   setTimeout(()=>{
      clearBoard();
      displayFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
   }, 200);
 }
 else if(!active){
    clearBoard();
    context.font ="bold 50px serif";
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText("Game Over!!",width/2,height/2)
 }
}

function keyPress(event){
   if(!started){
    started = true;
    nextTick();
   }
   // pause when space is pressed
   if(event.keyCode===32){
    console.log('clicked')
    if(paused){
        paused= false;
        nextTick();
    }
    else{
        paused = true;
    }
   }
   const left =37;
   const up = 38;
   const right = 39;
   const down = 40;
   switch(true){
    // left key pressed and not going right
      case(event.keyCode == left && xVel != unit):
         xVel = -unit;
         yVel = 0;
         break;
    // right key pressed and not going left
      case(event.keyCode == right && xVel != -unit):
         xVel = unit;
         yVel = 0;
         break;
    // up key pressed and not going down
      case(event.keyCode == up && yVel != unit):
         xVel = 0;
         yVel = -unit;
         break;
    // down key pressed and not going up
      case(event.keyCode == down && yVel != -unit):
         xVel = 0;
         yVel = unit;
         break;
   } 
}

function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=width):
        case(snake[0].y<0):
        case(snake[0].y>=height):
          active = false;
          break;
    }
}