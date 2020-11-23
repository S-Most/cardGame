import Deck from "./deck.js"

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,    
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
}

const CARD_VALUE_MAP_ACE = {
    "2": 15,
    "3": 3,
    "4": 4,
    "5": 5,    
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
}

const form = document.querySelector("form")
const gameWrapper = document.querySelector(".gameWrapper")
const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")
const computerDeckElem = document.querySelector(".computer-deck")
const playerDeckElem = document.querySelector(".player-deck")
const text = document.querySelector(".text")
const autoPlayBtn = document.querySelector(".autoPlay")
const deckColorBtn = document.querySelector(".setDeckColor")

let playerDeck, computerDeck, potDeck, inRound, stop, pause, randColor
let gameStarted = false

form.addEventListener('submit', function getTarget(e) {
    e.preventDefault()
    gameWrapper.style.display = "grid";
    gameStarted = true; 
    let suits = e.target.children[1].value;
    let values = e.target.children[3].value;
    if (!suits || !values){suits = 1; values=6;}
    const deckTotal = new Deck(suits, values)
    deckTotal.shuffle()
    startGame(deckTotal)
    form.reset()
    form.style.display ="none";
    autoPlayBtn.innerText="AutoPlay"
   });

document.addEventListener("click" , () => {
    deckColorBtn.addEventListener("click", () => {
    gameStarted = 0
    })
    if(gameStarted){
        playRound()
    }
    gameStarted = 1
})

deckColorBtn.addEventListener("click", () => {
    let colorArray = ["red","cornflowerblue","blue","darkgreen","orange","coral","purple","magenta"]
    let rand = Math.floor(Math.random()*5)
    if (rand === randColor){
        rand = 7-rand
    }
    playerDeckElem.style.backgroundColor = colorArray[rand]
    computerDeckElem.style.backgroundColor = colorArray[7-rand]
    randColor = rand
})

autoPlayBtn.addEventListener("click", () => {
    if(pause){
        pause=false
        autoPlay()
        autoPlayBtn.innerText="Pause"
    } else{
        pause=true
        autoPlayBtn.innerText="AutoPlay"
    }

})

function restart(){
    form.style.display ="flex";
    gameWrapper.style.display = "none";

}

function autoPlay(){
if (!pause){
    playRound()

    if (!stop){
        window.setTimeout(autoPlay,100);
    }
  }
}

function playRound(){
    if (stop){
        restart()

    } else{

        if (inRound){
            beforeRound()
        } else {
            flipCards()
        }
    }
}

function startGame(deck) {

    const midDeck = Math.ceil(deck.numberOfCards / 2)
    // create Decks
    playerDeck      = new Deck(0,0, deck.cards.slice(0,midDeck))
    computerDeck    = new Deck(0,0, deck.cards.slice(midDeck, deck.numberOfCards))
    potDeck         = new Deck([])

    //set parameters
    stop    = false
    pause   = true

    beforeRound()
}

function beforeRound() {
    inRound=false

    text.innerText = ""
    computerCardSlot.innerHTML= ""
    playerCardSlot.innerHTML= ""

    updateDeckCount()
}

function updateDeckCount(){
    computerDeckElem.innerText = computerDeck.numberOfCards
    playerDeckElem.innerText = playerDeck.numberOfCards
}

function flipCards() {
    inRound = true

    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()

    updateDeckCount()

    playerCardSlot.appendChild(playerCard.generateHTML())
    computerCardSlot.appendChild(computerCard.generateHTML())

    if (isRoundWinner(playerCard, computerCard)){
        text.innerText="Win!"
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
        pushToWinner(playerDeck)

    } else if (isRoundWinner(computerCard, playerCard)){
        text.innerText="Lose!"
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
        pushToWinner(computerDeck)

    } else {
        text.innerText="Draw"
        potDeck.push(playerCard)
        potDeck.push(computerCard)
    }

    if(gameOver(playerDeck)){
        text.innerText="YOU LOST!"
        autoPlayBtn.innerText="AutoPlay"
        stop = true;
    } else if(gameOver(computerDeck)){
        text.innerText="YOU WON!"
        autoPlayBtn.innerText="AutoPlay"
        stop = true;
    }
}

function isRoundWinner(cardOne, cardTwo) {
    if (cardOne.value === "A" || cardTwo.value ==="A")
    { return CARD_VALUE_MAP_ACE[cardOne.value] > CARD_VALUE_MAP_ACE[cardTwo.value]} else{
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]}
}

function gameOver(deck) {
    return deck.numberOfCards ===0
}

function checkDraw() {
    return potDeck.numberOfCards > 0
}

function pushToWinner(winner){
    while (checkDraw()){
        winner.push(potDeck.pop())
    }
}