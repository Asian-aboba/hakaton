const scenes = document.querySelectorAll('.scene');
const buttons = document.querySelectorAll('button[data-target]');
const fade = document.getElementById('fade');

let autoIndex = 0;


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
