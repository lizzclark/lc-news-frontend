import React, { Component } from 'react';
import * as api from '../api';
import Newspaper from './Newspaper';

class Articles extends Component {
  state = { articles: [] };

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { articles } = this.state;
    return (
      <>
        <h2>Viewing all articles</h2>
        <p>Buttons to toggle sort order</p>
        <p>Expanding box where you can post an article</p>
        {articles.length !== 0 ? (
          <Newspaper articles={articles} />
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  }

  getArticles = () => {
    api.fetchArticles().then(articles => this.setState({ articles }));
  };
}

export default Articles;
