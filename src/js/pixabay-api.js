import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '43147251-812f7b0e187b76efed42bbc3c';
const perPage = 15;

export default async function getImagesByQuery(query, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  });

  const result = await axios.get(`${API_URL}?${searchParams}`);
  const totalPages = Math.ceil(result.data.totalHits / perPage);

  return { data: result.data.hits, totalPages };
}
