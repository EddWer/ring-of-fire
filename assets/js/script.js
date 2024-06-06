document.addEventListener("DOMContentLoaded", function() {
    const rulesBtn = document.getElementById("rulesBtn");
    const gameArea = document.getElementById("gameArea");
    const participantForm = document.getElementById("participantForm");
    const submitParticipantsBtn = document.getElementById("submitParticipantsBtn");
    const rulesBox = document.getElementById("rulesBox");
    const rulesContent = document.getElementById("rulesContent");
    const closeBtn = rulesContent.querySelector("#close");
    const participants = [];
    let deck = [];
    let currentPlayerIndex = 0;

    submitParticipantsBtn.addEventListener("click", function() {
        const participantCount = parseInt(document.getElementById("participantCount").value);
        if (participantCount >= 2 && participantCount <= 15) {
            showParticipantInputs(participantCount);
        } else {
            alert("Please enter a number between 2 and 15");
        }
    });

    function showParticipantInputs(count) {
        participantForm.style.display = "none"

        const inputContainer = document.createElement("div");
        inputContainer.id = "participantInputs";

        for (let i = 0; i < count; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = `Participant ${i + 1}`;
            
            inputContainer.appendChild(input);
            participants.push("");
        }

        const submitNamesBtn = document.createElement("button");
        submitNamesBtn.textContent = "Submit names";
        submitNamesBtn.addEventListener("click", saveParticipantNames);

        inputContainer.appendChild(submitNamesBtn);
        gameArea.appendChild(inputContainer);
    }

    function saveParticipantNames() {
        const inputElements = document.querySelectorAll("#participantInputs input");
        inputElements.forEach((input, index) => {
            participants[index] = input.value.trim() || `Participant ${index + 1}`;
        });

        const namesDisplay = participants.map((name, index) => `<p>${name}</p>`).join("");
        gameArea.innerHTML = `<h2>Participants:</h2>${namesDisplay}`;

        const startGameBtn = document.getElementById("startGameBtn");
        startGameBtn.disabled = false;
        startGameBtn.addEventListener("click", startGame);

        const participantInputs = document.getElementById("participantInputs");
        participantInputs.remove();
    }

    function startGame() {
        const startGameBtn = document.getElementById("startGameBtn");
        startGameBtn.remove();
        const gameButtons = document.getElementById("gameButtons");
        const quitGameBtn = document.createElement("button");
        quitGameBtn.id = "quitGameBtn";
        quitGameBtn.textContent = "Quit game";
        quitGameBtn.addEventListener("click", quitGame);
        gameButtons.appendChild(quitGameBtn, rulesBtn);
        gameButtons.insertBefore(quitGameBtn, rulesBtn);
        const drawCardBtn = document.createElement("button");
        drawCardBtn.id = "drawCardBtn";
        drawCardBtn.textContent = "Draw card";
        drawCardBtn.addEventListener("click", drawCard);
        gameArea.innerHTML = `<p>Game has started. ${participants[currentPlayerIndex]} please draw a card to begin!</P>`;
        gameArea.appendChild(drawCardBtn);
        deck = createDeck();
    }

    function createDeck() {
        const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs']
        const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
        let deck = [];

        suits.forEach(suit => {
            values.forEach(value => {
                deck.push(`${value} of ${suit}`);
            });
        });

        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        return deck;
    }

    function displayCards() {
        const cardContainer = document.createElement("div");
        cardContainer.id = "cardContainer";
        gameArea.appendChild(cardContainer);

        cards.forEach(card => {
            const cardImg = document.createElement("img");
            cardImg.src = `imagesourcehere`;
            cardImg.alt = `${card.value} of ${card.suit}`;
            cardImg.classList.add("card");
            cardContainer.appendChild(cardImg);
        });
    }

    function quitGame() {
        gameArea.innerHTML = "";
        participantForm.style.display = "block";
        quitGameBtn.remove();
        const gameButtons = document.getElementById("gameButtons");
        const startGameBtnNew = document.createElement("button");
        startGameBtnNew.id = "startGameBtn";
        startGameBtnNew.textContent = "Start game";
        startGameBtnNew.disabled = true;
        gameButtons.insertBefore(startGameBtnNew, rulesBtn);
        startGameBtnNew.addEventListener("click", startGame);
        const drawCardBtn = document.getElementById("drawCardBtn");
        drawCardBtn.remove();
    }

    function drawCard() {
        if (deck.length === 0) {
            gameArea.innerHTML = `<p>No more cards in the deck! Start a new game to continue playing</p>`;
            return;
        }

        const card = deck.pop();
        const cardDisplay = document.createElement("p");
        cardDisplay.textContent = `Card drawn: ${card}`;
        const drawCardBtn = document.getElementById("drawCardBtn");
        gameArea.innerHTML = "";
        gameArea.appendChild(cardDisplay);
        currentPlayerIndex = (currentPlayerIndex + 1) % participants.length;
        const nextPlayerMessage = document.createElement("p");
        nextPlayerMessage.textContent = `${participants[currentPlayerIndex]}'s turn to draw a card!`;
        gameArea.appendChild(nextPlayerMessage);
        gameArea.appendChild(drawCardBtn);
    }

    rulesBtn.addEventListener ("click", function() {
        rulesBox.style.display = "block";
    });

    closeBtn.addEventListener("click", function() {
        rulesBox.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == rulesBox) {
            rulesBox.style.display = "none";
        }
    });
});