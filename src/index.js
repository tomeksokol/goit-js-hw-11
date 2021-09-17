import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
//import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const searchingBox = document.querySelector('input#search-box');
const background = document.querySelector('body');
const countryLIst = document.querySelector('.country-list');
const countryInfo = document.querySelector('country-info');

const eventHandler = event => {
  let name = event.currentTarget.value;
  fetchCountries(name)
    .then(name => renderCountryList(name))
    .catch(error => console.log(error));
};

searchingBox.addEventListener('input', eventHandler);

function renderCountryList(name) {
  const markup = name
    .map(country => {
      return `<li>
          <img class="flag__img" src="${country.flag}" alt="Flag of ${country.name}" width="50" height="30"><span class="country__name">${country.name}<span></img>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>languages</b>: ${country.languages[0].name}</p>
        </li>`;
    })
    .join('');
  countryLIst.innerHTML = markup;
}
// 1) Create function fetching data Countries
// 1a) Create const url
// 1b) Create URLSearchParams
// 1c) Add headers to fetch
// 2) Create add Event listener
// 3) Create function rendering data

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
