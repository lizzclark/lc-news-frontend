import React from 'react';

const ArticleCard = ({ article }) => {
  return (
    <div>
      {article.title}
      <br />
      {article.article_id}
    </div>
  );
};

export default ArticleCard;
