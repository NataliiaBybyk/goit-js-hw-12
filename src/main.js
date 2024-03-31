import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import createMarkup from './js/render-functions';
import getImages from './js/pixabay-api';

const list = document.querySelector('.todo-list');
const input = document.querySelector('.input-text');
const form = document.querySelector('.main-form');
const loader = document.querySelector('.loader');

loader.style.display = 'none';

form.addEventListener('submit', function handler(event) {
  event.preventDefault();
  list.style.marginTop = '60px';

  loader.style.display = 'inline-block';

  getImages(input.value)
    .then(data => {
      const images = data.hits;
      if (images.length === 0) {
        list.innerHTML = '';
        return handlerError();
      } else {
        list.innerHTML = createMarkup(images);
        const lightbox = new SimpleLightbox('.todo-list a.galery-link', {
          captionsData: 'alt',
          captionDelay: 500,
        });
        lightbox.refresh();
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      loader.style.display = 'none';
    });
  input.value = '';
});

function handlerError() {
  iziToast.error({
    maxWidth: '432px',
    messageSize: '16px',
    titleColor: ' #fafafb',
    messageColor: '#fff',
    message: `Sorry, there are no images matching your search query. Please try again!`,
    closeOnEscape: true,
    position: 'topRight',
    backgroundColor: '#ed6f7c',
  });
}
