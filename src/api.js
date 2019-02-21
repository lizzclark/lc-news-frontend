import axios from 'axios';

const request = axios.create({ baseURL: 'https://lc-news.herokuapp.com/api' });

const sortRefObj = {
  latest: 'created_at',
  comments: 'comment_count',
  votes: 'votes'
};

export const getArticles = async ({ topic, category }) => {
  let queryString = '';
  if (category) {
    queryString = `?sort_by=${sortRefObj[category]}`;
  }
  const response = topic
    ? await request.get(`/topics/${topic}/articles${queryString}`)
    : await request.get(`/articles${queryString}`);
  return response.data.articles;
};

export const getUserArticles = async username => {
  const response = await request.get(`/users/${username}/articles`);
  return response.data;
};

export const getTopics = async () => {
  const response = await request.get(`/topics`);
  return response.data.topics;
};

export const getUsers = async () => {
  const response = await request.get(`/users`);
  return response.data.users;
};

export const getArticle = async article_id => {
  const response = await request.get(`/articles/${article_id}`);
  return response.data.article;
};

export const getComments = async article_id => {
  const response = await request.get(`/articles/${article_id}/comments`);
  return response.data.comments;
};

export const getUser = async username => {
  const response = await request.get(`/users/${username}`);
  return response.data.user;
};

export const postArticle = async ({ title, body, topic, username }) => {
  const response = await request.post(`/topics/${topic}/articles`, {
    title,
    body,
    username
  });
  return response.data;
};

export const postComment = async ({ article_id, username, body }) => {
  const response = await request.post(`/articles/${article_id}/comments`, {
    body,
    username
  });
  return response;
};

export const deleteComment = async ({ comment_id, article_id }) => {
  const response = await request.delete(
    `/articles/${article_id}/comments/${comment_id}`
  );
  return response;
};

export const deleteArticle = async ({ article_id }) => {
  const response = await request.delete(`/articles/${article_id}`);
  return response;
};

export const patchResource = async ({ article_id, comment_id, inc_votes }) => {
  const path = comment_id
    ? `/articles/${article_id}/comments/${comment_id}`
    : `/articles/${article_id}`;
  const response = await request.patch(path, {
    inc_votes
  });
  return response;
};

export const postTopic = async ({ slug, description }) => {
  const response = await request.post(`/topics`, { slug, description });
  return response;
};
