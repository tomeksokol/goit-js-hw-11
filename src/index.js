'use strict';

import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import axios from 'axios';

const searchgBox = document.querySelector('input');
const searchBtn = document.querySelector('.search-btn');
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const clear = elems => [...elems.children].forEach(div => div.remove());
const loadBtn = document.querySelector('.load-more');
let page = 1;

// async function fetchImages(name) {
//   const response = await fetch(
//     `https://pixabay.com/api/?key=23580980-4f75151f85975025bb6074227&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`,
//   );
//   if (!response.ok) {
//     throw new Error(response.status);
//   }
//   return await response.json();
// }

async function fetchImages(name, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=23580980-4f75151f85975025bb6074227&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function eventHandler(ev) {
  ev.preventDefault();
  const {
    elements: { searchQuery },
  } = ev.currentTarget;
  console.log(searchQuery.value);
  let name = searchQuery.value;
  console.log(name);
  fetchImages(name, page)
    .then(name => {
      console.log(name.hits.length);
      console.log(name);

      if (name.hits.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${name.totalHits} images.`);
        renderGallery(name);
        page += 1;
        console.log(page);
        const lightbox = new SimpleLightbox('.gallery a', {});

        if (page > 1) {
          loadBtn.addEventListener('click', () => {
            let name = searchQuery.value;
            console.log('load more images');
            fetchImages(name, page).then(name => {
              renderGallery(name);
              lightbox.refresh();
              page += 1;
              console.log(page);
            });
          });
        }
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
        clear(gallery); //reset view in case of failure
      }
    })
    .catch(error => console.log(error));
}

searchForm.addEventListener('submit', eventHandler);

//  ====== ADD ALERT ======= HIDDEN BTN======

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
  gallery.insertAdjacentHTML('beforeend', markup);
}
