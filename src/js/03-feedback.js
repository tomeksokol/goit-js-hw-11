'use strict';

//import _throttle from '../../node_modules/lodash.throttle/index';
//import _throttle from '../../node_modules/lodash.throttle/index';
//import _default from '../../node_modules/lodash.throttle/index';
//import { throttle } from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const textMessage = document.querySelector('textarea');

updateOutput();

form.addEventListener('input', saveData);

function saveData(evt) {
  evt.preventDefault();
  localStorage.setItem('email', form.elements.email.value);
  console.log(form.elements.email.value);
  localStorage.setItem('message', form.elements.message.value);
  console.log(form.elements.message.value);
  updateOutput();
}

function updateOutput() {
  emailInput.textContent = localStorage.getItem('email');
  textMessage.textContent = localStorage.getItem('message');
}

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  console.log(`Email: ${email.value}, Message: ${message.value}`);
  event.currentTarget.reset();
  form.reset();
  localStorage.clear();
}
