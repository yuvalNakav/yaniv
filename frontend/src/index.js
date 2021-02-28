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
        this.totalValue = totalValue;
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
const slot = document.getElementById("slot");
const player1 =  document.getElementById("player1");
const player2 =  document.getElementById("player2");
const player3 =  document.getElementById("player3");
const player4 =  document.getElementById("player4");
const playerArr = [player1, player2, player3, player4];
playerDeck1.cards = player1.children;
playerDeck2.cards = player2.children;
playerDeck3.cards = player3.children;
playerDeck4.cards = player4.children;
const counters = Array.from(document.getElementsByClassName("counter"));
let turn = 0;
let pileDeck = new PileDeck;

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
    let tableDeck = new TableDeck();
    let newCard = deck.cards[0].createCard();
    newCard.classList.add("slotCard");
    newCard.id = "slotCard"
    deck.cards.shift();
    tableDeck.cards = deck.cards;
    let nextCard = document.createElement("div");
    nextCard.id = "upside-down";
    nextCard.classList.add("slotCard")
    slot.append(nextCard);
    slot.append(newCard);
    return tableDeck;
};

const cardDeck = document.getElementById("upside-down");

function getScores(){
    for(let playerDeck of playerDecks){
        let cards = playerDeck.cards;
        playerDeck.totalValue = 0;
        for(let card of cards){
            playerDeck.totalValue += card.value;
        }
    }
    for (let i = 0; i < 4; i++){
        counters[i].innerText = playerDecks[i].totalValue;
    }
}
window.addEventListener("load", newTurn);

function newTurn(){
    playerArr[turn].addEventListener("click", throwCard);
    playerArr[turn].style.border = "solid blue 5px";
    function throwCard(e){
        let selectedCard = e.target;
        let player = selectedCard.parentNode;
            if(selectedCard.classList.contains("card")){
                if (selectedCard.style.border !== "solid green 5px") {
                    selectedCard.style.border = "solid green 5px"
                    slot.addEventListener("click", getCard);
                    function getCard(g){
                        if(g.target.id === "slot"){
                            alert("please choose card")
                            getCard();
                        } else if(g.target.id === "slotCard"){
                            player.append(g.target)
                            player.removeChild[e.target]
                            slot.removeChild[1];
                            slot.append(selectedCard);
                            selectedCard.id = "slotCard";
                             if(turn === 1 || turn === 3){
                                selectedCard.classList.remove("sideways");
                                g.target.classList.add("sideways");
                            };                            
                            getScores();
                            selectedCard.style.border = "solid black 1px";
                            playerArr[turn].style.border = "solid white 5px";
                            playerArr[turn].removeEventListener("click", throwCard);
                            slot.removeEventListener("click", getCard);
                            turn = turn === 3 ?  0 : turn + 1;
                            declareYaniv(turn)
                            newTurn()
                            
                        }else if(g.target.id = "upside-down"){
                            player.removeChild[e.target];
                            let newCard = deck.cards[0].createCard();
                            deck.cards.shift();
                            player.append(newCard);
                            slot.removeChild[1];
                            slot.append(selectedCard);
                            selectedCard.id = "slotCard";
                            if(turn === 1 || turn === 3){
                                selectedCard.classList.remove("sideways");
                                newCard.classList.add("sideways");
                            };
                            getScores();
                            selectedCard.style.border = "solid black 1px";
                            playerArr[turn].style.border = "solid white 5px";
                            playerArr[turn].removeEventListener("click", throwCard);
                            slot.removeEventListener("click", getCard);
                            turn = turn === 3 ?  0 : turn + 1;
                            declareYaniv(turn)
                            newTurn();
                        }
                    };
                }
                else{
                    selectedCard.style.border = "solid black 1px";
                }
            }else{
             return
            };
        };
    
}
getScores();

function declareYaniv(turn){
    const yanivButton = document.getElementById("yaniv")
    let body = document.getElementsByTagName("body")
    console.log(yanivButton, body, playerDecks[turn].totalValue)
    playerDecks[turn].totalValue <= 7 ? yanivButton.style.display = "block" : yanivButton.style.display = "none"
}

if (deck.cards.length === 0){
    deck.cards = [...pileDeck.cards];
    console.log(deck.cards)
}
/* left to do: 
    3. write scores for every player (general)
    
*/