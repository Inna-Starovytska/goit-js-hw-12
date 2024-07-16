//
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const cardContainer = document.querySelector('.card-container');

export async function renderImgCard(dataArr) {
  try {
    const markupImages = dataArr
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<li class="gallery-item">
              <a class="gallery-link" href="${largeImageURL}">
                  <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360" height="200"/>
                  <ul class="gallery-text-list">
                      <li class="gallery-text-item"><h3>Likes</h3><p>${likes}</p></li>
                      <li class="gallery-text-item"><h3>Views</h3><p>${views}</p></li>
                      <li class="gallery-text-item"><h3>Comments</h3><p>${comments}</p></li>
                      <li class="gallery-text-item"><h3>Downloads</h3><p>${downloads}</p></li>
                  </ul>
              </a>
          </li>`
      )
      .join('');

    cardContainer.innerHTML = markupImages;

    const lightbox = new SimpleLightbox('.card-container a', {
      captionsData: 'alt',
      captionPosition: 'bottom',
    });

    lightbox.refresh();
  } catch (error) {
    console.error('Error rendering images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to render images',
      position: 'topRight',
    });
  }
}
