
const cardsArray = [
    {
        name : 'cookie',
        icon : '<i class="fa-solid fa-cookie"></i>'
    },
    {
        name : 'dog',
        icon : '<i class="fa-solid fa-dog"></i>'
    },
    {
        name : 'otter',
        icon : '<i class="fa-solid fa-otter"></i>'
    },
    {
        name : 'cake-candles',
        icon : '<i class="fa-solid fa-cake-candles"></i>'
    },
    {
        name : 'snowman',
        icon : '<i class="fa-solid fa-snowman"></i>'
    },
    {
        name : 'kiwi',
        icon : '<i class="fa-solid fa-kiwi-bird"></i>'
    },
    {
        name : 'cookie',
        icon : '<i class="fa-solid fa-cookie"></i>'
    },
    {
        name : 'dog',
        icon : '<i class="fa-solid fa-dog"></i>'
    },
    {
        name : 'otter',
        icon : '<i class="fa-solid fa-otter"></i>'
    },
    {
        name : 'cake-candles',
        icon : '<i class="fa-solid fa-cake-candles"></i>'
    },
    {
        name : 'snowman',
        icon : '<i class="fa-solid fa-snowman"></i>'
    },
    {
        name : 'kiwi',
        icon : '<i class="fa-solid fa-kiwi-bird"></i>'
    },
]

let flippedCards = [];
let matchedPairs = 0;
shuffleCards();
console.log(cardsArray)
const gameBoard = document.getElementById('gameBoard')
displayCards();

function shuffleCards(){
   for(let i = cardsArray.length-1;i>=0;i--){
     const randIndex = Math.floor(Math.random()*(i+1));
     [cardsArray[i],cardsArray[randIndex]] = [cardsArray[randIndex],cardsArray[i]] 
   }
 }

 function displayCards(){
    cardsArray.forEach((curr,index,arr)=>{
        const card = document.createElement('div');  // create div tag
        card.setAttribute('id',index);   // set id
        card.classList.add('cardback');
        card.classList.add('active'); // already finished card
        gameBoard.append(card);
        card.addEventListener('click',flipCard);
    })
 }

 function flipCard(){
    if(flippedCards.length<2 &&  this.classList.contains('active')){
     let cardId = this.getAttribute('id');
     console.log(cardId);
     console.log(this);
     flippedCards.push(this);
     this.classList.remove('cardback');
     this.innerHTML = cardsArray[cardId].icon;
     if(flippedCards.length == 2){
        setTimeout(checkMatch,1000);
     }
    }
 }

 function checkMatch(){
    const card1Id = flippedCards[0].getAttribute('id');
    const card2Id = flippedCards[1].getAttribute('id');
    if(cardsArray[card1Id].name === cardsArray[card2Id].name){
        flippedCards[0].style.border = 'none';
        flippedCards[0].style.backgroundColor = '#f5e8ba';
        flippedCards[0].innerHTML = '';
        flippedCards[0].classList.remove('active');
        flippedCards[1].classList.remove('active');
        flippedCards[1].style.border = 'none';
        flippedCards[1].style.backgroundColor = '#f5e8ba';
        flippedCards[1].innerHTML = '';
        matchedPairs++;
        checkGameOver();
    }
    else{
        flippedCards[0].innerHTML = '';
        flippedCards[0].classList.add('cardback');
        flippedCards[1].innerHTML = '';
        flippedCards[1].classList.add('cardback');
    }
    flippedCards = [];
 }

 function checkGameOver(){
    if(matchedPairs == cardsArray.length/2){
        while(gameBoard.firstChild){
         gameBoard.removeChild(gameBoard.firstChild)
    }
    gameBoard.innerHTML = 'You Won';
    gameBoard.classList.remove('game');
    gameBoard.classList.add('won');
 }
}