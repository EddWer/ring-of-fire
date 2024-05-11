document.addEventListener("DOMContentLoaded", function() {
    const startGameBtn = document.getElementById("startGameBtn");
    const gameArea = document.getElementById("gameArea");

    startGameBtn.addEventListener("click", startGame);

    function startGame() {
        gameArea.innerHTML = "<p>Rules: [Insert Ring of Fire rules here]</p>";
    }

});