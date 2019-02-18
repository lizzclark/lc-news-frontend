import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ article }) => {
  const { article_id } = article;
  return (
    <div>
      <Link to={`/articles/${article_id}`}>{article.title}</Link>
      <br />
      {article.article_id} <br />
    </div>
  );
};

export default ArticleCard;
