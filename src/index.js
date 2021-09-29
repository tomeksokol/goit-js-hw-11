'use strict';

import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
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
      console.log(name.hits.length);
      if (name.hits.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${name.totalHits} images.`);
        renderGallery(name);
        const lightbox = new SimpleLightbox('.gallery a', {});
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      }
    })
    .catch(error => console.log(error));
}

searchForm.addEventListener('submit', eventHandler);

function renderGallery(name) {
  const markup = name.hits
    .map(hit => {
      return `<div class="photo-card">
      <a class="gallery__item" href="${hit.largeImageURL}"> <img class="gallery__image" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <p><b>Likes</b> <br>${hit.likes}</br></p>
        </p>
        <p class="info-item">
          <p><b>Views</b> <br>${hit.views}</br></p>
        </p>
        <p class="info-item">
          <p><b>Comments</b> <br>${hit.comments}</br></p>
        </p>
        <p class="info-item">
          <p><b>Downloads</b> <br>${hit.downloads}</br></p>
        </p>
      </div>
    </div>`;
    })
    .join('');
  gallery.innerHTML = markup;
};
