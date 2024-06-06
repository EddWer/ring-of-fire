document.addEventListener("DOMContentLoaded", function() {
    const rulesBtn = document.getElementById("rulesBtn");
    const gameArea = document.getElementById("gameArea");
    const participantForm = document.getElementById("participantForm");
    const submitParticipantsBtn = document.getElementById("submitParticipantsBtn");
    const rulesBox = document.getElementById("rulesBox");
    const rulesContent = document.getElementById("rulesContent");
    const closeBtn = rulesContent.querySelector("#close");

    let participants = [];
    let cards = [];

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
        quitGameBtn.addEventListener("click", quitGame, playGame);
        gameButtons.appendChild(quitGameBtn, rulesBtn);
        gameButtons.insertBefore(quitGameBtn, rulesBtn);
        generateCards();
        displayCards();
    }

    function generateCards() {
        const suits = ['hearts', 'spades', 'diamonds', 'clubs']
        const values = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

        for (const suit of suits) {
            for (const value of values) {
                const card = { suit, value };
                cards.push(card);
            }
        }
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

    function playGame() {

    }
});