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

async function submitHandler(event) {
  event.preventDefault();
  pageNumber = 1;

  const { ['search-text']: searchInput } = event.target.elements;
  searchInputValue = searchInput.value.trim();

  if (!searchInputValue.length) {
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const { data, totalPages } = await getImagesByQuery(
      searchInputValue,
      pageNumber
    );

    if (!data.length) {
      hideLoadMoreButton();
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    createGallery(data);

    if (pageNumber >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: error.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
  form.reset();
}

async function moreButtonHandler(event) {
  event.preventDefault();
  const button = event.currentTarget;
  pageNumber += 1;
  showLoader();
  button.disadle = true;

  try {
    const { data, totalPages } = await getImagesByQuery(
      searchInputValue,
      pageNumber
    );

    if (!data.length) {
      hideLoadMoreButton();
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data);

    if (!pageNumber >= totalPages) {
      hideLoadMoreButton();
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }

    const itemHeight = gallery
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    hideLoadMoreButton();
    iziToast.error({
      message: error.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    button.disadle = false;
  }
}
