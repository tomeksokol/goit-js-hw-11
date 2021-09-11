'use strict';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const body = document.querySelector('body');
const buttons = document.querySelectorAll('button');
console.log(buttons);
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let bqrColor = '#fffff';

//START

const startInterval = evt => {
  stopBtn.disabled = false;
  bqrColor = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    console.log(bqrColor);
  }, 1000);
  startBtn.disabled = true;
};

startBtn.addEventListener('click', startInterval);

// STOP

const stopInterval = evt => {
  clearInterval(bqrColor);
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

stopBtn.addEventListener('click', stopInterval);

// Buttons style

startBtn.style.width = '70px';
startBtn.style.height = '40px';
startBtn.style.textTransform = 'uppercase';
startBtn.style.position = 'absolute';
startBtn.style.top = '50%';
startBtn.style.left = '50%';
startBtn.style.transform = 'translate(-50%, -50%)';

// startBtn.style.marginLeft = 'calc(50vw - 150px)';
// startBtn.style.marginTop = 'calc(25vw - 10px)';

stopBtn.style.width = '70px';
stopBtn.style.height = '40px';
stopBtn.style.textTransform = 'uppercase';
stopBtn.style.position = 'absolute';
stopBtn.style.top = '50%';
stopBtn.style.left = '56%';
stopBtn.style.transform = 'translate(-50%, -50%)';
