'use strict';

// Add imports above this line
import { galleryItems } from './gallery-items';
import _default from '../../node_modules/simplelightbox/dist/simple-lightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
console.log(galleryContainer);

const photoContainer = galleryItems
  .map(
    galleryItem =>
      `<a class="gallery__item" href="${galleryItem.original}"> <img class="gallery__image" src="${galleryItem.preview}" data-caption="${galleryItem.description}" alt="${galleryItem.description}"/></a>`,
  )
  .join('');
galleryContainer.insertAdjacentHTML('beforeend', photoContainer);
console.log(photoContainer);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
console.log(lightbox);
