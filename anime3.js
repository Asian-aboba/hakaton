const scenes = document.querySelectorAll('.scene');
const buttons = document.querySelectorAll('button[data-target]');
const fade = document.getElementById('fade');

let autoIndex = 0;

function autoAdvance() {
  if (autoIndex < 3) { // Сцена 1 -> 2, 2 -> 3
    fade.classList.add('active');

    setTimeout(() => {
      scenes[autoIndex].classList.remove('active');
      autoIndex++;
      scenes[autoIndex].classList.add('active');

      setTimeout(() => {
        fade.classList.remove('active');
      }, 1000);

      // Наступна авто-заміна
      setTimeout(autoAdvance, 3000);
    }, 1000);
  }
}

// Старт авто-сцен
setTimeout(autoAdvance, 3000);

// Звичайна логіка кнопок (починається з Сцени 4)
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');

    fade.classList.add('active');

    setTimeout(() => {
      scenes.forEach(scene => scene.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');

      setTimeout(() => {
        fade.classList.remove('active');
      }, 1000);
    }, 3000);
  });
});

const board = document.getElementById("board");
const message = document.getElementById("message");
let cells = [];
let gameOver = false;

function startGame() {
  board.innerHTML = "";
  message.textContent = "";
  gameOver = false;
  cells = Array(9).fill(null);
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => makeMove(i));
    board.appendChild(cell);
  }
  setTimeout(botMove, 300); // Бот ходить першим
}

function makeMove(index) {
  if (gameOver || cells[index]) return;
  cells[index] = "X";
  updateBoard();
  if (checkWinner("X")) {
    message.textContent = "Ти переміг!";
    gameOver = true;
    return;
  }
  if (cells.every(cell => cell)) {
    message.textContent = "Нічия!";
    gameOver = true;
    return;
  }
  setTimeout(botMove, 500);
}

function botMove() {
  if (gameOver) return;
  let emptyIndexes = cells.map((val, i) => val === null ? i : null).filter(v => v !== null);
  if (emptyIndexes.length === 0) return;
  let move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  cells[move] = "O";
  updateBoard();
  if (checkWinner("O")) {
    message.textContent = "Бот переміг!";
    gameOver = true;
  } else if (cells.every(cell => cell)) {
    message.textContent = "Нічия!";
    gameOver = true;
  }
}

function updateBoard() {
  const cellDivs = document.querySelectorAll(".cell");
  cellDivs.forEach((cell, i) => {
    cell.textContent = cells[i] || "";
  });
}

function checkWinner(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern => 
    pattern.every(index => cells[index] === player)
  );
}

startGame(); // Запуск гри при завантаженні
