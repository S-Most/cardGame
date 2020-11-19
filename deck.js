const SUITS = ["♥", "♦", "♣", "♠"]
const SUITADDITION = ["✪"]
const VALUES = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
]
function generateDeck(numSuits, numValues){
    return SUITS.slice(0,numSuits).flatMap((suit) => {
        return VALUES.slice(0,numValues).map((value) => {
            return new Card(suit, value);
        })
    })
}
export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
        this.shuffle()
    }

    //second constructor

    get numberOfCards() {
        return this.cards.length
    }

    pop() {
        return this.cards.shift()
    }

    push(card) {
        this.cards.push(card)
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i+1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    get color(){
        return this.suit === '♥' || this.suit === '♦' ? 'red' : 'black'
    }

    generateHTML(){
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}



//global functions ------------------------------

function freshDeck() {
    return SUITS.flatMap((suit) => {
        return VALUES.map((value) => {
            return new Card(suit, value);
        })
    })
}

function _6x6Deck() {
    return SUITS.flatMap((suit) => {
        return VALUES.slice(0,3).map((value) => {
            return new Card(suit, value);
        })
    })
}

