const SUITS = [`♠`, `♥`, `♦`, `♣`];
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const VALUES = {
    "☻" : 0,
    "A": 1,
    "2" :2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "10" : 10,
    "J" : 10,
    "Q" : 10,
    "K" : 10
}

class Card {
    constructor(rank, suit, isJocker = false, value) {
        this.rank = rank;
        this.suit = suit;
        this.isJocker = isJocker;
        this.value = value;
    }
    get color(){
        return this.suit === `♣` || this.suit === `♠`? `black` : `red`;
    }
    createCard(){
            const cardDiv = document.createElement("div");
            cardDiv.innerText = this.suit
            cardDiv.classList.add("card", this.color);
            cardDiv.dataset.value = `${this.rank} ${this.suit}`;
            cardDiv.value = VALUES[this.rank];
            return cardDiv;
        
    }
    pop(){

    }
};
class Jocker extends Card {
    super(rank = "Jocker", suit, isJocker){
        
    }
    createCard(){
            const cardDiv = document.createElement("div"); 
            cardDiv.innerText = `${this.rank}`;
            cardDiv.classList.add("card", this.suit);
            cardDiv.dataset.value = `${this.rank}`;
            cardDiv.value = VALUES[this.rank];
            return cardDiv;

        
    }
}
class Deck{
    constructor(){
        this.cards = [];
    }
    createDeck(){
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
const blackJocker = new Jocker("☻", "black", true);
const redJocker = new Jocker("☻", "red", true);
let deck = new Deck();
const playerDeck1 = new PlayerDeck;
const playerDeck2 = new PlayerDeck;
const playerDeck3 = new PlayerDeck;
const playerDeck4 = new PlayerDeck;
let playerDecks = [playerDeck1, playerDeck2, playerDeck3, playerDeck4];
const playerDiv = Array.from(document.getElementsByClassName("player"));
let cardArr = Array.from(document.getElementsByClassName("card"));
let cardDiv = document.getElementsByClassName("card");
const tableDiv = document.getElementById("slot");
const player1 =  document.getElementById("player1");
const player2 =  document.getElementById("player2");
const player3 =  document.getElementById("player3");
const player4 =  document.getElementById("player4");
const playerArr = [player1, player2, player3, player4];
for (let playerDeck of playerDecks) {
    for(let player of playerArr){
        for (let i = 0; i < player.children.length; i++){
            playerDeck.cards = player.children;
        }
        console.log(player)
    }
    console.log(playerDeck)
};
// playerDeck1.cards = player1.children;
// playerDeck2.cards = player2.children;
// playerDeck3.cards = player3.children;
// playerDeck4.cards = player4.children;

function startGame(){
    deck.createDeck()
    deck.cards.push(blackJocker, redJocker);
    deck.shuffle();
    for (let i = 1; i <= 4; i++){
        let player = document.getElementById("player"+i);
        let playerDeck = new PlayerDeck();
        for(let j = 0; j < 5; j++){
            let newCard = deck.cards[0].createCard();
            player.append(newCard);
            playerDeck.cards.push(deck.cards.shift());
            if(i === 2 || i === 4){
                newCard.classList.add("sideways");
            }
        }
    }
    flipTableDeck();
}
startGame()
function flipTableDeck(){
    const slot = document.getElementById("slot");
    let tableDeck = new TableDeck();
    let newCard = deck.cards[0].createCard();
    deck.cards.shift();
    tableDeck.cards = deck.cards;
    let nextCard = document.createElement("div");
    nextCard.id = "upside-down";
    slot.append(nextCard);
    slot.append(newCard);
    return tableDeck;
};

const cardDeck = document.getElementById("upside-down");

playerDiv.forEach(player => {addEventListener("click", throwCard)});
function throwCard(e){
    let card = e.target;
    let player = card.parentNode;
    if(card.classList.contains("card")){
        if (card.classList[0] === "card") {
            player.removeChild[e.target]
            slot.removeChild(slot.children[1]);
            slot.append(card);
            if(card.classList.contains("sideways")) card.classList.remove("sideways");
        }
    }
}

function getScores(){
    playerDecks.forEach( playerDeck => {
        playerDeck.cards.forEach(card => {
            console.log(card.value)
        });
    })
}
getScores();
cardDeck.addEventListener("click", getNewCard);
function getNewCard(){
    let card = e.target;
    let table = card.parentNode;
}



/* left to do: 
    1. get new card each round turn
    2. throw correct combo in one turn
    3. write scores for every player (general and per round)
    4. hide players decks when its not their turn.
    optional: change diraction to sideways cards
*/