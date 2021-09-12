'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');
import Notiflix from 'notiflix';

const startDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
const daysOutput = document.querySelector('.timer span[data-days]');
const hoursOutput = document.querySelector('.field span[data-hours]');
const minutesOutput = document.querySelector('.field span[data-minutes]');
const secondsOutput = document.querySelector('.field span[data-seconds');

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let selectedUtcDate = selectedDates[0].getTime();
    let date = new Date();
    let todayUtcDate = date.getTime();
    //console.log(selectedUtcDate);
    //console.log(todayUtcDate);
    let msLeft = selectedUtcDate - todayUtcDate;
    //console.log(msLeft);
    if (selectedUtcDate < todayUtcDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      const countdown = evt => {
        evt.preventDefault();
        let currentTime = setInterval(() => {
          let ms = selectedUtcDate - new Date().getTime();
          console.log(ms);

          convertMs(ms);
          console.log(convertMs(ms));
          daysOutput.textContent = String(Math.floor(ms / day));
          hoursOutput.textContent = String(Math.floor((ms % day) / hour));
          minutesOutput.textContent = String(Math.floor(((ms % day) % hour) / minute));
          secondsOutput.textContent = String(Math.floor((((ms % day) % hour) % minute) / second));
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
