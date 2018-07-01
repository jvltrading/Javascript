//
// Blackjack
// Sample by Joshua Langman from PluralSight.com
//

// Card Variables
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = ["Ace", "King", "Queen", "Jack", "Ten",
	"Nine", "Eight", "Seven", "Six","Five","Four",
	"Three", "Two"];

// DOM Variables
let textArea = document.getElementById("text-area");
let newGameButton = document.getElementById("new-game");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");

// Game Variables
let gameStarted = false,
	gameOver = false,
	playerWon = false,
	dealerCards = [],
	playerCards = [],
	dealerScore = 0,
	playerScore = 0,
	deck = [];
	tieGame = false;

hitButton.style.display = "none";
stayButton.style.display = "none";
showStatus();

newGameButton.addEventListener('click', function(){
	gameStarted = true;
	gameOver = false;
	playerWon = false;
	tieGame = false;

	deck = createDeck();
	shuffleDeck(deck);
	dealerCards = [ getNextCard(), getNextCard() ];
	playerCards = [ getNextCard(), getNextCard() ];

	document.getElementById("author").style.display = "none";
	textArea.innerText = "Game Started...";
	newGameButton.style.display = 'none';
	hitButton.style.display = 'inline';
	stayButton.style.display = 'inline';
	checkForEOG();
	showStatus();
});

hitButton.addEventListener('click', function() {
	playerCards.push(getNextCard());
	checkForEOG();
	showStatus();
});

stayButton.addEventListener('click', function() {
	gameOver = true;
	checkForEOG();
	showStatus();
});

function createDeck() {
	let deck = [];
	for (let suitidx = 0; suitidx < suits.length; suitidx++) {
		for (let valueidx = 0; valueidx < values.length; valueidx++) {
			let card = {
				suit: suits[suitidx],
				value: values[valueidx]
			};
			deck.push( card );
		}
	}
	return deck;
}

function shuffleDeck(deck) {
	for ( let i = 0; i < deck.length; i++) {
		let swapidx = Math.trunc(Math.random() * deck.length);
		let tmp = deck[swapidx];
		deck[swapidx] = deck[i];
		deck[i] = tmp;
	}
}

function getCardString (card) {
	return card.value + ' of ' + card.suit;
}

function getNextCard() {
	return deck.shift();
}

function getCardNumValue(card) {
	switch(card.value) {
		case 'Ace':
			return 1;
		case 'Two':
			return 2;
		case 'Three':
			return 3;
		case 'Four':
			return 4;
		case 'Five':
			return 5;
		case 'Six':
			return 6;
		case 'Seven':
			return 7;
		case 'Eight':
			return 8;
		case 'Nine':
			return 9;
		default:
			return 10;
	}
}

function getScore(cardArray) {
	let score = 0;
	let hasAce = false;

	for (let i = 0; i < cardArray.length; i++) {
		let card = cardArray[i];
		score += getCardNumValue(card);
		if (card.value === 'Ace')
			hasAce = true;
	}
	if (hasAce && score + 10 <= 21) {
		return score + 10;
	}
	return score;
}

function updateScores() {
	dealerScore = getScore(dealerCards);
	playerScore = getScore(playerCards);
}

function checkForEOG() {
	updateScores();
	if (playerScore == 21 || dealerScore == 21) {
		if (playerScore == 21){
			playerWon = true;
		}
		else if (dealerScore == 21) {
			playerWon = false;
		}
		gameOver = true;
	}
	if (dealerCards.length >= 5) {
		gameOver = true;
		console.log(dealerCards.length);
	}
	if (gameOver) {
		while (dealerScore <= playerScore 
		&& playerScore <= 21 && dealerScore < 17) {
			dealerCards.push(getNextCard());
			updateScores();
		}
	}
	if (playerScore > 21) {
		playerWon = false;
		gameOver = true;
	}else if (dealerScore > 21) {
		playerWon = true;
		gameOver = true;
	}else if (gameOver) {
		if (playerScore == dealerScore && dealerScore >= 17) {
			tieGame = true;
		}
		else if (playerScore > dealerScore) {
			playerWon = true;
		}
		else {
			playerWon = false;
		}
	}
	console.log(dealerCards.length);
}

function showStatus() {
	if (!gameStarted) {
		textArea.innerText = "Welcome to Blackjack!";
		return;
	}
	let dealerCardString = '';
	for (let i = 0; i < dealerCards.length; i++) {
		dealerCardString += getCardString(dealerCards[i]) + '\n';
	}
	let playerCardString = '';
	for (let i = 0; i < playerCards.length; i++) {
		playerCardString += getCardString(playerCards[i]) + '\n';
	}

	updateScores();

	textArea.innerText =
		'Dealer has:\n' +
		dealerCardString +
		'(score: ' + dealerScore + ')\n\n' +

		'Player has:\n' +
		playerCardString +
		'(score: ' + playerScore + ')\n\n';

	if (gameOver) {
		if (playerWon)
			textArea.innerText += "You Win!";
		else if (tieGame)
			textArea.innerText += "Tie Game!";
		else 
			textArea.innerText += "Dealer Wins!";

		newGameButton.style.display = 'inline';
		hitButton.style.display = 'none';
		stayButton.style.display = 'none';
	}
	updateScores();
}