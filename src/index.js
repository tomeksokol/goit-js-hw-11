'use strict';

import './css/styles.css';

import Notiflix from 'notiflix';

const searchgBox = document.querySelector('input');
const searchBtn = document.querySelector('.search-btn');
const gallery = document.querySelector('.gallery');

// async function fetchImages(name) {
//   const response = await fetch(
//     `https://pixabay.com/api/?key=23580980-4f75151f85975025bb6074227&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`,
//   );
//   const photos = await response.json();
//   return console.log(photos);
// }

// const searchingResults = async event => {
//   let name = event.target.value;
//   console.log(photos);
//   console.log(fetchImages(name));
//   try {
//     const photos = await fetchImages();
//     console.log(photos);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

function fetchPhotos(name) {
  return fetch(
    `https://pixabay.com/api/?key=23580980-4f75151f85975025bb6074227&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`,
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function searchingResults(event) {
  let name = event.target.value;
  console.log(fetchPhotos(name));
  fetchPhotos(name)
    .then(name => renderGallery(name))
    .catch(error => console.log(error));
}

searchBtn.addEventListener('click', searchingResults);

function renderGallery(name) {
  const markup = name
    .map(hits => {
      return `<li> ${hits.id}</li>`;
    })
    .join('');
  gallery.innerHTML = markup;
}
