import React, { Component } from 'react';
import * as api from '../api';

class Articles extends Component {
  state = { articles: [] };

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { articles } = this.state;
    return (
      <div>
        Articles:
        {articles.map(article => (
          <div key={article.article_id}>{article.title}</div>
        ))}
      </div>
    );
  }

  getArticles = () => {
    api.fetchArticles().then(articles => this.setState({ articles }));
  };
}

export default Articles;
