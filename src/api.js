import axios from 'axios';
const BASE_URL = 'https://lc-news.herokuapp.com/api';

export const fetchArticles = async () => {
  const response = await axios.get(`${BASE_URL}/articles`);
  return response.data.articles;
};
