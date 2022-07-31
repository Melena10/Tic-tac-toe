"use strict";

const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector(".game--status");
const gameRestart = document.querySelector(".game--restart");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const drawMessage = "Game ended in a draw!";
const winningMessage = () => `Player ${currentPlayer} has won!`;

const winninglines = [
  [0, 1, 2] /* первый вариант победы по горизонтали */,
  [3, 4, 5] /* второй вариант победы по горизонтали */,
  [6, 7, 8] /* третий вариант победы по горизонтали */,
  [0, 3, 6] /* первый вариант победы по вертикали */,
  [1, 4, 7] /* второй вариант победы по вертикали */,
  [2, 5, 8] /* третий вариант победы по вертикали */,
  [0, 4, 8] /* вариант победы по диагонали слева  */,
  [2, 4, 6] /* вариант победы по диагонали справа  */,
];

gameRestart.addEventListener("click", function () {
  for (let i = 0; i < cells.length; ++i) {
    cells[i].textContent = "";
  }

  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
});

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
}

function handleCellClick(event) {
  let getDataIndex = event.target.dataset.cellIndex;

  if (!gameActive || gameState[getDataIndex] !== "") {
    return;
  } else {
    gameState[getDataIndex] = currentPlayer;
    cells[getDataIndex].textContent = currentPlayer;
    handleResultValidation();
  }
}

for (let k = 0; k < cells.length; k++) {
  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
}

function handleResultValidation() {
  let roundWon = false;

  for (let i = 0; i < winninglines.length - 1; i++) {
    const winCondition = winninglines[i];
    const a = gameState[winCondition[0]];
    const b = gameState[winCondition[1]];
    const c = gameState[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    } else if (a === b && b === c) {
      gameActive = false;
      alert(winningMessage());
      return;
    }
  };
  
  if (gameState.includes("") != true && gameActive === true) {
    alert(drawMessage);
  }
  handlePlayerChange();
};
