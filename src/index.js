'use strict';

import './css/styles.css';

import Notiflix from 'notiflix';

const searchgBox = document.querySelector('input');
const searchBtn = document.querySelector('.search-btn');
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

async function fetchImages(name) {
  const response = await fetch(
    `https://pixabay.com/api/?key=23580980-4f75151f85975025bb6074227&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`,
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

// function fetchPhotos(name) {
//   return fetch(
//     `https://pixabay.com/api/?key=23580980-4f75151f85975025bb6074227&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`,
//   ).then(data  => data.json())
//   .then(data => console.log(data))
//   .catch(error => console.log(error));
// }

// function searchingResults(event) {
//   let name = event.target.value;
//   console.log(fetchPhotos(name));
//   fetchPhotos(name)
//     .then(name => console.log(name))
//     .catch(error => console.log(error));
// }

// let input = searchgBox.addEventListener('input', e => {
//    let inputSearch = e.target.value;
//    console.log(inputSearch);
//  });

// const searchingResults = async event => {
//   console.log("Button is clicked");
//   let name = inputSearch;
//   fetchImages(name)
//     .then(name => console.log(name))
//     .catch(error => console.log(error));
//   console.log(name);
//   console.log(name.hits[0].pageURL);
//   console.log(fetchImages(name));
// };

async function eventHandler(ev) {
  ev.preventDefault();
  const {
    elements: { searchQuery },
  } = ev.currentTarget;
  console.log(searchQuery.value);
  let name = searchQuery.value;
  console.log(name);
  const fetching = await fetchImages(name)
    .then(name => {
      console.log(name);
      console.log(name.hits.length);
      if (name.hits.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${name.totalHits} images.`);
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      }
    })
    .catch(error => console.log(error));
}

searchForm.addEventListener('submit', eventHandler);
//searchBtn.addEventListener('click', searchingResults);

// function renderGallery(name) {
//   const markup = name
//     .map(hits => {
//       return `<li> ${hits}</li>`;
//     })
//     .join('');
//   gallery.innerHTML = markup;
// }
