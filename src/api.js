import axios from 'axios';

const request = axios.create({
  baseURL: 'https://lc-news.herokuapp.com/api'
});

export const getArticles = async ({ topic, category, direction, page }) => {
  const path = topic ? `/topics/${topic}/articles` : '/articles';
  const response = await request.get(path, {
    params: { sort_by: category, p: page, order: direction }
  });
  return response.data;
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
  const response = await request.get(`/usersZZZ`);
  return response.data.users;
};

export const getArticle = async article_id => {
  const response = await request.get(`/articles/${article_id}`);
  return response.data.article;
};

export const getComments = async ({ article_id, page }) => {
  const response = await request.get(`/articles/${article_id}/comments`, {
    params: { p: page }
  });
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

export const deleteResource = async ({ article_id, comment_id }) => {
  const path = comment_id
    ? `/articles/${article_id}/comments/${comment_id}`
    : `/articles/${article_id}`;
  const response = await request.delete(path);
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
