const SUITS = [`♥`, `♦`, `♣`, `♠`];
const RANKS = [`Ace`, "2", "3", "4", "5", "6", "7", "8", "9", "10", `Jack`, `Queen`, `King`];
class Card {
    constructor(rank, suit, isJocker = false) {
        this.rank = rank;
        this.suit = suit;
        this.isJocker = isJocker;
    }
    get color(){
        return this.suit === `♣` || this.suit === `♠`? `black` : `red`;
    }
    createCard(card){
        const cardDiv = document.createElement("div");
        cardDiv.innerText =this.suit;
        cardDiv.classList.add("card");
    }
}
class Jocker extends Card {
    constructor(rank = "Jocker", color, isJocker = true){
        this.isJocker = isJocker;
    }
}
class Deck{
    constructor(){
        this.cards = [];
    }
    createDeck(value, sign, isJocker = false){
            RANKS.forEach(rank => {
                SUITS.forEach(suit =>{
                    this.cards.push( new Card(rank, suit, false));
                })
            })
        }
    
    get numberOfCards(){
        return this.cards.length;
    }
    shuffle(){
        for (let i = this.numberOfCards -1 ; i > 0; i--){
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
    deal(){
        let hand =[];
        while (hand.length < 5){
            hand.push(this.cards.pop());
        }
        return hand;
    }
}


const deck = new Deck();
deck.createDeck()
const blackJocker = new Jocker("0", "black", );
const redJocker = new Jocker("red");
deck.cards.push(blackJocker, redJocker);
deck.shuffle()
console.log(deck)
 