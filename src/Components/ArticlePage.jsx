import React, { Component } from 'react';
import * as api from '../api';
import Comments from './Comments';

class ArticlePage extends Component {
  state = { article: {} };

  componentDidMount() {
    this.getArticle();
  }

  render() {
    const { article } = this.state;
    return (
      <div className="article-page">
        <h1>{article.title}</h1>
        <article>{article.body}</article>
        <Comments article_id={article.article_id} />
      </div>
    );
  }

  getArticle = () => {
    const { article_id } = this.props;
    api.fetchArticle(article_id).then(article => this.setState({ article }));
  };
}

export default ArticlePage;
