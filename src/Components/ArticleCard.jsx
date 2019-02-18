import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ article }) => {
  const { article_id } = article;
  return (
    <div>
      <Link to={`/articles/${article_id}`}>{article.title}</Link>
      <br />
      Votes: {article.votes} <br />
      User: {article.author} <br />
      Topic: {article.topic} <br />
      Date: {article.created_at} <br />
      Comments: {article.comment_count} <br />
    </div>
  );
};

export default ArticleCard;
