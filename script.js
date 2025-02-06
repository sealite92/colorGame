const colorBox = document.getElementById("colorBox");
const buttons = document.querySelectorAll(".color-btn");
const scoreDisplay = document.querySelector(".score");
const gameStatus = document.querySelector(".gameStatus");
const startGameBtn = document.getElementById("startGameBtn");

let score = 0;
let correctColor = "";
let gameStarted = false; // Track game state

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    startGameBtn.textContent = "New Game"; // Change button text
  }
  resetGame();
}

function resetGame() {
  score = 0;
  updateScore();
  gameStatus.textContent = "Guess the color!";

  generateColors();
}

function generateColors() {
  correctColor = getRandomColor();
  colorBox.style.backgroundColor = correctColor;

  const correctButton = Math.floor(Math.random() * buttons.length);
  buttons.forEach((btn, index) => {
    const color = index === correctButton ? correctColor : getRandomColor();
    btn.style.backgroundColor = color;
    btn.onclick = () => checkGuess(btn);
  });
}

function checkGuess(button) {
  if (button.style.backgroundColor === correctColor) {
    score++;
    gameStatus.textContent = " Correct!";
  } else {
    gameStatus.textContent = " Wrong! Try again.";
  }

  updateScore();
  setTimeout(generateColors, 1000); // Start a new round after 1 second
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

startGameBtn.addEventListener("click", startGame);
