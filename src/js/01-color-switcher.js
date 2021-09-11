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
  bqrColor = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    console.log(bqrColor);
  }, 1000);
};

startBtn.addEventListener('click', startInterval);

// STOP

const stopInterval = evt => {
  clearInterval(bqrColor);
};

stopBtn.addEventListener('click', stopInterval);

// Buttons style

startBtn.style.width = '70px';
startBtn.style.height = '40px';
startBtn.style.textTransform = 'uppercase';

stopBtn.style.width = '70px';
stopBtn.style.height = '40px';
stopBtn.style.textTransform = 'uppercase';

// function wrap(el, wrapper) {
//   el.parentNode.insertBefore(wrapper, el);
//   wrapper.appendChild(el);
// }

// wrap(buttons[0], document.createElement('div'));
