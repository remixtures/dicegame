// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")

function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
}

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    
    if (player1Turn) {
      player1Score += randomNumber;
      addDice(randomNumber, player1Turn);
      if (player1Score < 20) {
        setTimeout(() => {
          player1Scoreboard.textContent = player1Score
          player1Dice.classList.remove("active")
          player2Dice.classList.add("active")
          message.textContent = "Player 2 Turn"
          removeAnimation();
        }, 1500);
      }
    } else {
      player2Score += randomNumber
      addDice(randomNumber, player1Turn);
      if (player2Score < 20) {
        setTimeout(() => {
          player2Scoreboard.textContent = player2Score
          player2Dice.classList.remove("active")
          player1Dice.classList.add("active")
          message.textContent = "Player 1 Turn"
          removeAnimation();
        }, 1500);
      }
    }
    
    if (player1Score >= 20) {
        setTimeout(() => {
          message.textContent = "Player 1 Wins ✌️"
          player1Scoreboard.textContent = player1Score
          processWin(player1Dice);
        }, 1500);
    } else if (player2Score >= 20) {
      setTimeout(() => {
        player2Scoreboard.textContent = player2Score
        message.textContent = "Player 2 Wins 🎆"
        processWin(player2Dice);
      }, 1500);
    }
    player1Turn = !player1Turn
});
 
resetBtn.addEventListener("click", function(){
    reset()
});

function processWin (playerDice) {
  message.classList.add("blinking");
  playerDice.classList.remove("active");
  showResetButton()
}

/* Reset Game */
function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    message.textContent = "Player 1 Turn"
    message.classList.remove("blinking");
    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
    removeAnimation();
    player1Dice.style.backgroundColor = 'rgb(255, 255, 45)';
    player2Dice.style.backgroundColor = 'rgb(255, 255, 45)';
}

/* Choose dice image based on random number */
function addDice(randomNumber, player1Turn) {
  let image = 'dado-' + randomNumber + '.png';
  if (player1Turn) {
    player1Dice.style.backgroundColor = "transparent";
    player1Dice.classList.add('spin');
    player1Dice.innerHTML = `<img src='images/${image}' class='dice' alt='dice'>`;
  } else {
    player2Dice.style.backgroundColor = 'transparent';
    player2Dice.classList.add('spin');
    player2Dice.innerHTML = `<img src='images/${image}' class='dice' alt='dice'>`;
  }
}

function removeAnimation() {
  player1Dice.classList.remove('spin');
  player2Dice.classList.remove('spin');
}