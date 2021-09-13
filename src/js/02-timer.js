'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');
import Notiflix from 'notiflix';

const startDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const countdownContainer = document.querySelector('.timer');
const field = document.querySelectorAll('.field');
const numberValue = document.querySelectorAll('.field .value');
const daysOutput = document.querySelector('.timer span[data-days]');
const hoursOutput = document.querySelector('.field span[data-hours]');
const minutesOutput = document.querySelector('.field span[data-minutes]');
const secondsOutput = document.querySelector('.field span[data-seconds');

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let selectedUtcDate = selectedDates[0].getTime();
    let date = new Date();
    let todayUtcDate = date.getTime();

    if (selectedUtcDate < todayUtcDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      const countdown = evt => {
        evt.preventDefault();
        const currentCounter = setInterval(() => {
          let ms = selectedUtcDate - new Date().getTime();
          console.log(ms);
          startBtn.disabled = true;
          convertMs(ms);
          console.log(convertMs(ms));

          daysOutput.textContent = addLeadingZero(String(convertMs(ms).days));
          hoursOutput.textContent = addLeadingZero(String(convertMs(ms).hours));
          minutesOutput.textContent = addLeadingZero(String(convertMs(ms).minutes));
          secondsOutput.textContent = addLeadingZero(String(convertMs(ms).seconds));

          if (
            convertMs(ms).days === 0 &&
            convertMs(ms).hours === 0 &&
            convertMs(ms).minutes === 0 &&
            convertMs(ms).seconds === 0
          ) {
            console.log('Counter stop');
            clearInterval(currentCounter);
            countdownContainer.style.color = 'red';
          }
        }, 1000);
      };

      startBtn.addEventListener('click', countdown);
    }
  },
};

flatpickr(startDate, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value < 10) {
    return value.padStart(2, '0');
  } else {
    return value;
  }
}

//countdown styles
startDate.style.fontSize = '25px';
startDate.style.marginBottom = '30px';
startBtn.style.fontSize = '25px';
countdownContainer.style.display = 'flex';

field.forEach(item => {
  item.style.display = 'flex';
  item.style.flexDirection = 'column';
  item.style.alignItems = 'center';
  item.style.marginRight = '25px';
  item.style.textTransform = 'uppercase';
  item.style.fontWeight = '500';
});

numberValue.forEach(val => (val.style.fontSize = '40px'));
