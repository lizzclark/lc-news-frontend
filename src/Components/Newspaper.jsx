import React from 'react';
import ArticleCard from './ArticleCard';

const Newspaper = ({ articles }) => {
  return (
    <div class="newspaper">
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default Newspaper;
