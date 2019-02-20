import React, { Component } from 'react';
import * as api from '../api';
import Comments from './Comments';

class ArticlePage extends Component {
  state = { article: {} };

  componentDidMount() {
    this.fetchArticle();
  }

  render() {
    const { article } = this.state;
    const { user } = this.props;
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
    api.getArticle(article_id).then(article => this.setState({ article }));
  };
}

export default ArticlePage;
