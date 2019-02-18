import React, { Component } from 'react';
import * as api from '../api';

class ArticlePage extends Component {
  state = { article: {} };

  componentDidMount() {
    this.getArticle();
  }

  render() {
    return (
      <div className="article-page">
        {this.state.article.title}
        <br />
        {this.state.article.body}
      </div>
    );
  }

  getArticle = () => {
    const { article_id } = this.props;
    api.fetchArticle(article_id).then(article => this.setState({ article }));
  };
}

export default ArticlePage;
