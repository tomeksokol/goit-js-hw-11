console.log('hello');

const form = document.querySelector('.feedback-form');
console.log(form);
const email = document.querySelector('input');
console.log(email);
const message = document.querySelector('textarea');
console.log(message);
const send = document.querySelector('button');
console.log(send);

// const form = document.querySelector("#message-form");
// const output = document.querySelector("#output");
// const LOCALSTORAGE_KEY = "goit-example-message";

// updateOutput();
// form.addEventListener("submit", saveMessage);

// function saveMessage(evt) {
//   evt.preventDefault();
//   localStorage.setItem(LOCALSTORAGE_KEY, form.elements.message.value);
//   updateOutput();
//   form.reset();
// }

// function updateOutput() {
//   output.textContent = localStorage.getItem(LOCALSTORAGE_KEY) || "";
// }
