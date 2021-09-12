'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');
import Notiflix from 'notiflix';

//data wybrana z kalendarzea przeformatowania na UTC i porównanie UTC do dzisiejszego UTC jak liczba większa button.disable = false

const startDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
const daysOutput = document.querySelector('.timer span[data-days]');
//const hoursOutput = document.querySelector('.field span[data-hours]');
const minutesOutput = document.querySelector('.field span[data-minutes]');
const secondsOutput = document.querySelector('.field span[data-seconds');
let utcTime = null;

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
