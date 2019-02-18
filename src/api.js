import axios from 'axios';

export const fetchArticles = async () => {
  const response = await axios.get(
    'https://lc-news.herokuapp.com/api/articles'
  );
  console.log(response);
  return response.data.articles;
};
