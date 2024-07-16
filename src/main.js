import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages, onFetchError, hideSpinner } from './js/pixabay-api';
import { renderImgCard } from './js/render-functions';


const refs = {
searchForm = document.querySelector('.search-form');
cardContainer = document.querySelector('.card-container');
loadMoreContainer = document.querySelector('.load-more-container');
loadMoreButton = document.querySelector('.button-load-more');
loader = document.querySelector('.loader');
}

// let currentPage = 1;
// let currentQuery = '';

const params = {
  q: '',
  page: 1,
  pageSize: 15,
  maxPage: 0,
};

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



/*

! Submit
1. повісити обробник події на сабміт форми
  1.1. перевент дефолт
  1.2. очистити всю сторінку від результатів попереднього запиту. Також зкидуємо номер сторінки в параметрах запиту на 1 (page = 1)
  1.3. збираємо запит користувача (з поля вводу)
  1.4. перевіряємо чи користувач взагалі щось ввів (перевірка на пустий рядок з використанням тріму)
  1.5. вмикаємо прелоадер на кнопці (блокуючи натискання на неї) та викликаємо фукнцію запиту (описана окремо)
  1.6. отримуємо дані з серверу та малюємо їх на сторінці
  1.7. розблоковуємо кнопку завантажити більше та прибираємо прелоадер

! Load more
Стани кнопки

1. hidden - стан, коли кнопки взагалі немає на сторінці. В ситуаціях: до запиту, коли немає новин, коли кінець колекції (при полмилці)
2. active - стан, коли кнопка активна до нового натискання та запиту. В ситуаціяї коли користувач може підвантажити нові дані з серверу.
3. disabled - стан, коли йде запит і кнопка повинна бути не активною для натискання, також вона повинна відображати прелоадер. В ситуаціяї, коли користувач натискає на кнопку та чекає відповіді від серверу.

при натисканні на кнопку повинен йти запит на сервер з вказанням сторінки +1

*/

// import refs from "./refs.js";
// import { getNews } from "./services/newsAPIService.js";
// import appendArticlesMarkup from "./templates/articles.js";
// import buttonService from "./services/loadMoreService.js";

// const params = {
//   q: "",
//   page: 1,
//   pageSize: 5,
//   maxPage: 0,
// };

// ховаємо кнопку при першому завантаженні сторінки
// buttonService.hide(refs.loadMoreBtn);

// console.log(refs.loadMoreBtn);

// refs.searchForm.addEventListener("submit", handleSearch);

// async function handleSearch(event) {
//   event.preventDefault(); // step 1.1

// step 1.2.
// refs.articlesContainer.innerHTML = "";
// params.page = 1;

// const form = event.currentTarget;
// params.q = form.elements.query.value.trim(); // step 1.3.

// 1.4.
// if (!params.q) {
//   Notiflix.Notify.failure("Введіть запит!");
//   form.reset();
//   return;
// }

// перед запитом показую кнопку та включаю спінер
// buttonService.show(refs.loadMoreBtn);
// buttonService.disable(refs.loadMoreBtn, refs.spinner);

// try {
// отримали відповідь від серверу з новинами
// const { articles, totalResults } = await getNews(params);

// порахували максимальну сторінку яка можлива в нашій пошуковій видачі (для цього треба кількість усіх нови поділити на кількість новин на одній сторінці)
// params.maxPage = Math.ceil(totalResults / params.pageSize);

// малюємо розмітку
// appendArticlesMarkup(articles);

//перевірка на те, що по-перше, у нас взагалі є результати, і на те, що кількість статей не дорівнює кількості всіх результатів (якщо вони рівні, то у нас не існує наступних сторінок)
// if (articles.length > 0 && articles.length !== totalResults) {
// розблоковуємо кнопку для натискань
// buttonService.enable(refs.loadMoreBtn, refs.spinner);
// коли кнопка розблокується і стане доступною для взаємодії - ми повісимо на неї обробник
//   refs.loadMoreBtn.addEventListener("click", handleLoadMore);
// } else {
// ховаємо кнопку якщо немає результатів по запиту, або не існує наступної сторінки
//   buttonService.hide(refs.loadMoreBtn);
// }

//     console.log(articles, totalResults);
//     console.log(params);
//   } catch (err) {
//     console.log(err);
//     Notiflix.Notify.failure(`Помилка під час запиту: ${err}`);
//   } finally {
//     form.reset();
//   }
// }

/*
 1. збільшуємо значення сторінки на 1
 2. відключаємо кнопку та включаємо спінер
 3. робимо запит на сервер
 4. отримуємо відповідь
 5. відмальовуємо розмітку
 6. після запиту: включити кнопку та перевірити чи не досягли ми ліміту наших сторінок (перевірити поточну сторінку та максимальну сторінку яку ми порахували раніше), якщо ми досягли останньої сторінки, то ховаємо кнопку(+ повідомлення) та видаляємо слухача подій з нашої кнопки

*/

// async function handleLoadMore() {
//   params.page += 1;
//   buttonService.disable(refs.loadMoreBtn, refs.spinner);

//   try {
// отримали відповідь від серверу з новинами
// const { articles } = await getNews(params);

// малюємо розмітку
//   appendArticlesMarkup(articles);
// } catch (err) {
//   console.log(err);
//   Notiflix.Notify.failure(`Помилка під час запиту: ${err}`);
// } finally {
// розблоковуємо кнопку для натискань
// buttonService.enable(refs.loadMoreBtn, refs.spinner);

// якщо поточна сторінка рівна максимальні сторінці, то наступних сторінок не існує
//     if (params.page === params.maxPage) {
//       buttonService.hide(refs.loadMoreBtn);
//       refs.loadMoreBtn.removeEventListener("click", handleLoadMore);
//     }
//   }
// }

// з чату
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
