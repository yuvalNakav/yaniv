const SUITS = [`♠`, `♥`, `♦`, `♣`];
const RANKS = [`A`, "2", "3", "4", "5", "6", "7", "8", "9", "10", `J`, `Q`, `K`];
class Card {
    constructor(rank, suit, isJocker = false) {
        this.rank = rank;
        this.suit = suit;
        this.isJocker = isJocker;
    }
    get color(){
        return this.suit === `♣` || this.suit === `♠`? `black` : `red`;
    }
    createCard(){
            const cardDiv = document.createElement("div");
            cardDiv.innerText = this.suit
            cardDiv.classList.add("card", this.color);
            cardDiv.dataset.value = `${this.rank} ${this.suit}`;
            return cardDiv;
        
    }
};
class Jocker extends Card {
    super(rank = "Jocker", suit, isJocker){
        this.isJocker = isJocker;
        this.rank = rank;
    }
    createCard(){
            const cardDiv = document.createElement("div"); 
            cardDiv.innerText = `${this.rank}`;
            cardDiv.classList.add("card", this.suit, this.rank);
            cardDiv.dataset.value = `${this.rank}`;
            return cardDiv;

        
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
};
class PlayerDeck extends Deck{
    super(){
        this.cards = [];
    }
    createDeck(){
        this.cards.push(Card.cards.pop());
    }
}
class TableDeck extends Deck{
    super(){
        this.cards = [];
    }
    createDeck(){
        this.cards.push(Card.cards.pop())
    }
}
class PileDeck extends Deck{
    super(){
            this.cards = [];
    }
        createDeck(){
            this.cards.push(Card.cards.pop())
        }
}
let deck = new Deck();
function startGame(){
    deck.createDeck()
    const blackJocker = new Jocker("☻", "black", true);
    const redJocker = new Jocker("☻", "red", true);
    deck.cards.push(blackJocker, redJocker);
    deck.shuffle();
    for (let i = 1; i <= 4; i++){
        let player = document.getElementById("player"+i);
        let playerDeck = new PlayerDeck();
        for(let j = 0; j < 5; j++){
            let newCard = deck.cards[0].createCard();
            player.append(newCard);
            playerDeck.cards.push(deck.cards.shift());
            if(i === 2 || i === 3){
                newCard.classList.add("sideways");
            }
        }
        // let player3 = document.getElementById("player3")
        // let player2 = document.getElementById("player2")
    }
    flipTableDeck();
}
startGame()
function flipTableDeck(){
    const slot = document.getElementById("slot");
    let tableDeck = new TableDeck();
    let newCard = deck.cards[0].createCard();
    slot.append(newCard);
    deck.cards.shift();
    tableDeck.cards = deck.cards;
}