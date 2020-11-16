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

const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")
const computerDeckElem = document.querySelector(".computer-deck")
const playerDeckElem = document.querySelector(".player-deck")
const text = document.querySelector(".text")

let playerDeck, computerDeck, inRound, stop

document.addEventListener("click" , () => {
    if (stop){
        startGame()
        return
    }
    
    if(inRound){
        beforeRound()
    } else {
        flipCards()
    }
})

startGame()
function startGame() {
    const deck = new Deck()
    const midDeck = Math.ceil(deck.numberOfCards / 2)
    
    playerDeck = new Deck(deck.cards.slice(0,midDeck))
    computerDeck = new Deck(deck.cards.slice(midDeck, deck.numberOfCards))
    
    inRound = false
    stop = false

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
    } else if (isRoundWinner(computerCard, playerCard)){
        text.innerText="Lose!"
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    } else {
        text.innerText="Draw"
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }

    if(gameOver(playerDeck)){
        text.innerText("YOU LOST!")
        stop = true;
    } else if(gameOver(computerDeck)){
        text.innerText("YOU WON!")
        stop = true;
    }
}

function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function gameOver(deck) {
    return deck.numberOfCards ===0
}