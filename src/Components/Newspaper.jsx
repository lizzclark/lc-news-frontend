import React from 'react';
import ArticleCard from './ArticleCard';
import './Newspaper.css';

const Newspaper = ({ articles, user }) => {
  return (
    <div class="newspaper">
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} user={user} />
      ))}
    </div>
  );
};

export default Newspaper;
