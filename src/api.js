import axios from 'axios';
const BASE_URL = 'https://lc-news.herokuapp.com/api';

const sortRefObj = {
  latest: 'created_at',
  comments: 'comment_count',
  votes: 'votes'
};

export const fetchArticles = async ({ topic, category }) => {
  let queryString = '';
  if (category) {
    queryString = `?sort_by=${sortRefObj[category]}`;
  }
  const response = topic
    ? await axios.get(`${BASE_URL}/topics/${topic}/articles${queryString}`)
    : await axios.get(`${BASE_URL}/articles${queryString}`);
  return response.data.articles;
};

export const fetchUserArticles = async username => {
  const response = await axios.get(`${BASE_URL}/users/${username}/articles`);
  return response.data;
};

export const fetchTopics = async () => {
  const response = await axios.get(`${BASE_URL}/topics`);
  return response.data.topics;
};

export const fetchUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data.users;
};

export const fetchArticle = async article_id => {
  const response = await axios.get(`${BASE_URL}/articles/${article_id}`);
  return response.data.article;
};

export const fetchComments = async article_id => {
  const response = await axios.get(
    `${BASE_URL}/articles/${article_id}/comments`
  );
  return response.data.comments;
};

export const fetchUser = async username => {
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response.data.user;
};
