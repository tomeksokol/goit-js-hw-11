import './css/styles.css';
//import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const searchingBox = document.querySelector('#search-box');
const background = document.querySelector('body');

//country searching styles

// Add a box shadow on focus
searchingBox.addEventListener('focus', e => {
  e.target.style.outline = 'none';
  e.target.style.borderColor = 'red';
});

// Remove the box shadow when the user doesn't focus anymore
searchingBox.addEventListener('blur', e => {
  e.target.style.borderColor = '#212121';
  e.target.style.outline = 'none';
});
