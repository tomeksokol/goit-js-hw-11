'use strict';

import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

//const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const searchingBox = document.querySelector('input#search-box');
const countryLIst = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function eventHandler(event) {
  let name = event.target.value.trim();
  console.log(fetchCountries(name));
  if (name === '') {
    Notiflix.Notify.success('Please enter a country name.');
    countryLIst.style.display = 'none';
    countryInfo.style.display = 'none';
  } else {
    fetchCountries(name)
      .then(name => {
        if (name.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (name.length >= 2 && name.length <= 10) {
          renderCountryList(name);
          countryLIst.style.display = 'block';
          countryInfo.style.display = 'none';
        } else if (name.length === 1) {
          renderCountryInfo(name);
          countryLIst.style.display = 'none';
          countryInfo.style.display = 'block';
        } else {
          Notiflix.Notify.failure('Oops, there is no country with that name.');
          countryLIst.style.display = 'none';
          countryInfo.style.display = 'none';
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name.');
        countryLIst.style.display = 'none';
        countryInfo.style.display = 'none';
      });
  }
}

searchingBox.addEventListener('input', debounce(eventHandler, DEBOUNCE_DELAY));

function renderCountryList(name) {
  const markup = name
    .map(country => {
      return `<li class="country__list">
          <img class="flag__img" src="${country.flags[0]}" alt="Flag of ${country.name}" width="50" height="30"><span class="country__name">${country.name}</span></img>
        </li>`;
    })
    .join('');
  countryLIst.innerHTML = markup;
}

function renderCountryInfo(name) {
  const markup = name
    .map(country => {
      return `<li class="country__info">
          <img class="flag__img" src="${country.flags[0]}" alt="Flag of ${
        country.name
      }" width="50" height="30"><span class="country__name">${country.name}</span></img>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${country.languages.map(language => ' ' + language.name)}</p>
        </li>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}

//STYLES

//background body style
document.body.style.backgroundImage = 'radial-gradient(#a1a0a0 1%, transparent 10%)';
document.body.style.backgroundSize = '70px 70px';
countryLIst.style.listStyle = 'none';
countryInfo.style.listStyle = 'none';
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
//styles of country info
countryInfo.style.fontSize = '30px';
countryInfo.style.marginTop = '30px';
countryInfo.style.marginLeft = '20px';
//countryName.style.fontWeight = '900px';

//styles of country list
countryLIst.style.marginLeft = '20px';
countryLIst.style.fontSize = '20px';
countryLIst.style.padding = '0';
