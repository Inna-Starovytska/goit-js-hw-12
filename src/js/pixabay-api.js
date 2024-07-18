import axios from 'axios';

export const returnPromise = (q, page) => {
  return axios.get('https://pixabay.com/api/', {
    params: {
      key: '44914505-36a6b847b314a6ef1bce975f7',
      q,
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: '15',
    },
  });
};
