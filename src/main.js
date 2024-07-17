// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// import {
//   fetchImages,
//   onFetchError,
//   hideSpinner,
//   pagination,
// } from './js/pixabay-api';

// import { renderImgCard, cardContainer } from './js/render-functions';

// const searchForm = document.querySelector('.search-form');
// const cardContainer = document.querySelector('.card-container');
// const loadMoreButton = document.querySelector('.button-load-more');
// const loader = document.querySelector('.loader');
// const hiddenClass = 'is-hidden';

// let currentPage = 0;
// let currentQuery = '';

// searchForm.addEventListener('submit', handleSearch);

// export function showSpinner() {
//   spinner.style.display = 'flex';
// }
// function hidden(button) {
//   button.classList.add(hiddenClass);
// }
// function show(button) {
//   button.classList.remove(hiddenClass);
// }

// function disable(button) {
//   button.disabled = true;
// }

// function enable(button) {
//   button.disabled = false;
// }

// hidden(buttonLoadMore);

// async function handleSearch(event) {
//   event.preventDefault();
//   cardContainer.innerHTML = '';
//   pagination.page = 1;
//   const form = event.currentTarget;
//   const queryValue = form.elements.query.value.trim();

//   if (queryValue === '') {
//     iziToast.error({
//       title: 'Error',
//       message: 'Please enter a search term!',
//       position: 'topRight',
//     });
//     form.reset();
//     return;
//   }

//   try {
//     let data = await fetchImages(queryValue);
//     renderImgCard(data.hits);
//     show(buttonLoadMore);
//     totalPages = Math.ceil(data.total / pagination.perPage);

//     if (pagination.page > currentPage) {
//       hidden(buttonLoadMore);
//       return iziToast.error({
//         message: "We're sorry, but you've reached the end of search results.",
//         position: 'topRight',
//       });
//     }
//     enable(buttonLoadMore);

//     buttonLoadMore.addEventListener('click', handleLoadMore);
//   } catch (error) {
//     onFetchError(error);
//   } finally {
//     form.reset();
//     hideSpinner();
//     form.reset();
//   }
// }

// async function handleLoadMore() {
//   disable(buttonLoadMore);
//   pagination.page += 1;

//   try {
//     let data = await getPicturesByQuery(queryValue);
//     renderImgCard(data.hits);

//     const galleryItem = document.querySelector('.gallery-item');
//     const itemHeight = galleryItem.getBoundingClientRect().height;
//     window.scrollBy({
//       top: itemHeight * 2,
//       behavior: 'smooth',
//     });
//   } catch (error) {
//     console.error(error);
//     onFetchError();
//   } finally {
//     enable(buttonLoadMore);

//     if (pagination.page >= totalPages) {
//       hide(buttonLoadMore);

//       btnLoadMore.removeEventListener('click', handleLoadMore);
//       iziToast.warning({
//         title: 'Error',
//         message: "We're sorry, but you've reached the end of search results.",
//         position: 'topRight',
//       });
//     }
//     hideSpinner();
//   }
// }

// import {
//   fetchImages,
//   onFetchError,
//   hideSpinner,
//   pagination,
// } from './js/pixabay-api';
// import { renderImgCard } from './js/render-functions';

// const searchForm = document.querySelector('.search-form');
// const loadMoreBtn = document.querySelector('.load-more-btn');
// let currentQuery = '';

// searchForm.addEventListener('submit', handleSearch);
// loadMoreBtn.addEventListener('click', loadMoreImages);

// function handleSearch(event) {
//   event.preventDefault();
//   const form = event.currentTarget;
//   const queryValue = form.elements.query.value.trim();

//   if (queryValue === '') {
//     iziToast.error({
//       title: 'Error',
//       message: 'Please enter a search term!',
//       position: 'topRight',
//     });
//     return;
//   }

//   if (queryValue !== currentQuery) {
//     pagination.page = 1;
//     currentQuery = queryValue;
//     cardContainer.innerHTML = '';
//     loadMoreBtn.style.display = 'none';
//   }

//   fetchImages(queryValue)
//     .then(data => {
//       if (data.hits.length === 0) {
//         iziToast.warning({
//           message:
//             'Sorry, there are no images matching your search query. Please try again!',
//           position: 'topRight',
//         });
//         return;
//       }

//       renderImgCard(data.hits);

//       if (data.totalHits > pagination.page * pagination.perPage) {
//         loadMoreBtn.style.display = 'block';
//       } else {
//         iziToast.info({
//           message: "We're sorry, but you've reached the end of search results.",
//           position: 'topRight',
//         });
//       }
//     })
//     .catch(onFetchError)
//     .finally(() => {
//       form.reset();
//       hideSpinner();
//     });
// }

// function loadMoreImages() {
//   pagination.page += 1;

//   fetchImages(currentQuery)
//     .then(data => {
//       renderImgCard(data.hits);

//       if (data.totalHits <= pagination.page * pagination.perPage) {
//         loadMoreBtn.style.display = 'none';
//         iziToast.info({
//           message: "We're sorry, but you've reached the end of search results.",
//           position: 'topRight',
//         });
//       }
//     })
//     .catch(onFetchError)
//     .finally(hideSpinner);
// }

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages, onFetchError, hideSpinner } from './js/pixabay-api';
import { renderImgCard } from './js/render-functions';

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const queryValue = form.elements.query.value.trim();

  if (queryValue === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
  } else {
    fetchImages(queryValue)
      .then(data => {
        if (data.hits.length === 0) {
          iziToast.warning({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
        }
        renderImgCard(data.hits);
      })
      .catch(onFetchError)
      .finally(() => {
        form.reset();
        hideSpinner();
      });
  }
}
