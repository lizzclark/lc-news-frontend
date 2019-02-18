import axios from 'axios';
const BASE_URL = 'https://lc-news.herokuapp.com/api';

export const fetchArticles = async topic => {
  const response = topic
    ? await axios.get(`${BASE_URL}/topics/${topic}/articles`)
    : await axios.get(`${BASE_URL}/articles`);
  return response.data.articles;
};

export const fetchTopics = async () => {
  const response = await axios.get(`${BASE_URL}/topics`);
  return response.data.topics;
};

export const fetchUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data.users;
};
