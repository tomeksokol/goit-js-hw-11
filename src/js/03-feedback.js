const form = document.querySelector('.feedback-form');

const message = '';
const email = '';

const emailInput = document.querySelector('.feedback-form input');

const textMessage = document.querySelector('textarea');

updateOutput();

form.addEventListener('input', saveData);

function saveData(evt) {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = evt.currentTarget;
  localStorage.setItem('email', email.value);
  console.log(form.elements.email.value);
  localStorage.setItem('message', message.value);
  console.log(form.elements.message.value);
  updateOutput();
  // form.reset();
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
  localStorage.clear();

  console.log(`Email: ${email.value}, Message: ${message.value}`);
  event.currentTarget.reset();
}

//const result = _.add(2, 3);
//console.log(result);
