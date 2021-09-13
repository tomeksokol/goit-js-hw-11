'use strict';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const body = document.querySelector('body');
const buttons = document.querySelectorAll('button');
console.log(buttons[0]);
console.log(buttons[1]);
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

startBtn.style.marginLeft = 'calc(50vw - 150px)';
startBtn.style.marginTop = 'calc(25vw - 10px)';

stopBtn.style.width = '70px';
stopBtn.style.height = '40px';
stopBtn.style.textTransform = 'uppercase';

//wrapper
// const wrapAll = (target, wrapper) => {
//   [...target.nextElementSibling].forEach(child => wrapper.appendChild(child));
//   target.appendChild(wrapper);
//   return wrapper;
// };
// wrapAll(buttons, document.createElement('div'));
// const wrap = function (toWrap, wrapper) {
//   wrapper = document.createElement('div');
//   wrapper.classList.add('wrap');
//   toWrap.parentNode.append(wrapper);
//   return wrapper.append(toWrap);
// };
// wrap(startBtn, document.createElement('div'));
