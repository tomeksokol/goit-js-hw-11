import './css/styles.css';
//import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const searchingBox = document.querySelector('#search-box');
const background = document.querySelector('body');

//STYLES

//background image style
document.body.style.backgroundImage = 'radial-gradient(#a1a0a0 1%, transparent 10%)';
document.body.style.backgroundSize = '70px 70px';
// Add a box shadow on focus
searchingBox.addEventListener('focus', e => {
  e.target.style.outline = 'none';
  e.target.style.border = '2px solid #3b6deb';
});
// Remove the box shadow when the user doesn't focus anymore
searchingBox.addEventListener('blur', e => {
  e.target.style.borderColor = '#212121';
  searchingBox.style.border = '1px solid #212121';
});
searchingBox.style.marginLeft = '20px';
searchingBox.style.marginTop = '20px';
searchingBox.style.maxWidth = 'none';
searchingBox.style.width = '650px';
searchingBox.style.height = '70px';
//searchingBox.style.border = '2px solid #212121';
