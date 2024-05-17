document.addEventListener("DOMContentLoaded", function() {
    const startGameBtn = document.getElementById("startGameBtn");
    const gameArea = document.getElementById("gameArea");
    const participantForm = document.getElementById("participantForm");
    const submitParticipantsBtn = document.getElementById("submitParticipantsBtn");

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

        const gameButtons = document.getElementById("gameButtons");
        gameButtons.innerHTML = "<button id='quitGameBtn'>Quit Game</button>";

        const quitGameBtn = document.getElementById("quitGameBtn");
        quitGameBtn.addEventListener("click", quitGame);

        startGameBtn.remove();

    }

    function startGame() {
        gameArea.innerHTML = "<p>Rules: [Insert Ring of Fire rules here]</p>";
    }

    function quitGame() {
        gameArea.innerHTML = "";

        const participantForm = document.getElementById("participantForm");
        participantForm.style.display = "block";

        const gameButtons = document.getElementById("gameButtons");
        gameButtons.innerHTML = "<button id='startGameBtn' disabled>Start game</button>";
    }

});