import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ article }) => {
  const { article_id } = article;
  return (
    <div>
      <Link to={`/articles/${article_id}`}>{article.title}</Link>
      <br />
      User: {article.author} <br />
      Topic: {article.topic} <br />
      Date: {article.created_at} <br />
      Votes: {article.votes} <br />
      Comments: {article.comment_count} <br />
    </div>
  );
};

export default ArticleCard;
