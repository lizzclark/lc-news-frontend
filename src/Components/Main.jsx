import React, { Component } from 'react';
import * as api from '../api';

class Main extends Component {
  state = { articles: [] };

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { articles } = this.state;
    return (
      <div className="main">
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

export default Main;
