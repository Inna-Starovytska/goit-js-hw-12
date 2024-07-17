//
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

export const pagination = {
  page: 1,
  perPage: 15,
};

const spinner = document.querySelector('.loader');

function showSpinner() {
  spinner.style.display = 'flex';
}

export function hideSpinner() {
  spinner.style.display = 'none';
}

export async function fetchImages(query) {
  const params = new URLSearchParams({
    key: '44914505-36a6b847b314a6ef1bce975f7',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: pagination.perPage,
    page: pagination.page,
  });
  showSpinner();

  try {
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    return response.data;
  } catch (error) {
    onFetchError(error);
    throw error;
  } finally {
    hideSpinner();
  }
}

export function onFetchError(error) {
  iziToast.error({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
}
