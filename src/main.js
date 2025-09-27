import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.button-more');
let pageNumber = 1;
let searchInputValue = '';

form.addEventListener('submit', submitHandler);
loadMoreButton.addEventListener('click', moreButtonHandler);

function submitHandler(event) {
  event.preventDefault();
  pageNumber = 1;

  const { ['search-text']: searchInput } = event.target.elements;
  searchInputValue = searchInput.value.trim();

  if (!searchInputValue.length) {
    return;
  }
  clearGallery();
  showLoader();

  getImagesByQuery(searchInputValue, pageNumber)
    .then(({ data, totalPages }) => {
      if (!data.length) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
      createGallery(data);
      showLoadMoreButton();

      if (pageNumber >= totalPages) {
        hideLoadMoreButton();
      }
    })
    .catch(error => {
      clearGallery();
      iziToast.error({
        message: error.message,
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });

  form.reset();
}

function moreButtonHandler(event) {
  event.preventDefault();
  const button = event.currentTarget;
  pageNumber += 1;
  showLoader();

  getImagesByQuery(searchInputValue, pageNumber)
    .then(({ data, totalPages }) => {
      if (pageNumber >= totalPages) {
        hideLoadMoreButton();
      } else {
        showLoadMoreButton();
      }

      if (pageNumber > totalPages) {
        throw new Error(
          "We're sorry, but you've reached the end of search results"
        );
      }

      createGallery(data);
      button.disadle = true;

      const itemHeight = gallery
        .querySelector('.gallery-item')
        .getBoundingClientRect().height;

      window.scrollBy({
        top: itemHeight * 3,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      hideLoadMoreButton();
      iziToast.info({
        message: error.message,
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
      button.disadle = false;
    });
}
