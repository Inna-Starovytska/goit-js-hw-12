import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages, onFetchError, hideSpinner } from './js/pixabay-api';
import { renderImgCard } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const cardContainer = document.querySelector('.card-container');
const loadMoreContainer = document.querySelector('.load-more-container');
const loadMoreButton = document.querySelector('.load-more');
const loader = document.querySelector('.loader');
let currentPage = 1;
let currentQuery = '';

searchForm.addEventListener('submit', handleSearch);

loadMoreButton.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const queryValue = form.elements.query.value.trim();

  if (queryValue === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  try {
    const data = await fetchImages(queryValue);

    if (data.hits.length === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }

    renderImgCard(data.hits);
  } catch (error) {
    onFetchError(error);
  } finally {
    form.reset();
    hideSpinner();
  }
}

// function handleSearch(event) {
//   event.preventDefault();
//   const form = event.currentTarget;
//   currentQuery = form.elements.query.value.trim();

//   if (currentQuery === '') {
//     iziToast.error({
//       title: 'Error',
//       message: 'Please enter a search term!',
//       position: 'topRight',
//     });
//     return;
//   }

//   currentPage = 1; // Скидаємо сторінку до початкового значення при новому запиті
//   performSearch();
// }

// async function performSearch() {
//   showSpinner();
//   try {
//     const data = await fetchImages(currentQuery, currentPage);
//     if (data.hits.length === 0) {
//       iziToast.warning({
//         title: 'No Results',
//         message:
//           'Sorry, there are no images matching your search query. Please try again!',
//         position: 'topRight',
//       });
//     }
//     renderImgCard(data.hits);
//     if (data.totalHits > cardContainer.children.length) {
//       showLoadMoreButton();
//     } else {
//       hideLoadMoreButton();
//     }
//   } catch (error) {
//     onFetchError(error);
//   } finally {
//     hideSpinner();
//   }
// }

// async function handleLoadMore() {
//   currentPage++;
//   showSpinner();
//   try {
//     const data = await fetchImages(currentQuery, currentPage);
//     renderImgCard(data.hits);
//     if (data.totalHits <= cardContainer.children.length) {
//       hideLoadMoreButton();
//     }
//   } catch (error) {
//     onFetchError(error);
//   } finally {
//     hideSpinner();
//   }
// }

// function showLoadMoreButton() {
//   loadMoreContainer.style.display = 'block';
// }

// function hideLoadMoreButton() {
//   loadMoreContainer.style.display = 'none';
// }

// function showSpinner() {
//   loader.style.visibility = 'visible';
// }

// function hideSpinner() {
//   loader.style.visibility = 'hidden';
// }
