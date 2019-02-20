import React, { Component } from 'react';
import * as api from '../api';
import Comments from './Comments';

class ArticlePage extends Component {
  state = { article: {}, isLoading: true };

  componentDidMount() {
    this.fetchArticle();
  }

  render() {
    const { article, isLoading } = this.state;
    const { user } = this.props;
    if (isLoading) return <h2>Loading article...</h2>;
    return (
      <div className="article-page">
        <h1>{article.title}</h1>
        <article>{article.body}</article>
        <Comments article_id={article.article_id} user={user} />
      </div>
    );
  }

  fetchArticle = () => {
    const { article_id } = this.props;
    api
      .getArticle(article_id)
      .then(article => this.setState({ article, isLoading: false }));
  };
}

export default ArticlePage;
