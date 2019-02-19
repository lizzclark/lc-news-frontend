import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ article }) => {
  const {
    article_id,
    title,
    topic,
    created_at,
    comment_count,
    author,
    votes
  } = article;
  return (
    <div>
      <Link to={`/articles/${article_id}`}>{title}</Link>
      <br />
      by <Link to={`/users/${author}`}>{author}</Link> <br />
      in <Link to={`/topics/${topic}/`}>{topic}</Link> <br />
      Date: {created_at} <br />
      {votes} votes <br />
      <Link to={`/articles/${article_id}`}>{comment_count} comments</Link>{' '}
      <br />
      <hr />
    </div>
  );
};

export default ArticleCard;
