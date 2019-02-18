import React, { Component } from 'react';
import * as api from '../api';
import Newspaper from './Newspaper';
import SortButton from './SortButton';

class Articles extends Component {
  state = { articles: [], category: 'date' };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.category !== this.state.category) this.getArticles();
  }

  render() {
    const { articles } = this.state;
    console.log('category is', this.state.category);
    console.log(articles);
    return (
      <>
        <h2>Viewing all articles</h2>

        <div>
          Sort by: <SortButton category="latest" sortBy={this.sortBy} />
          <SortButton category="comments" sortBy={this.sortBy} />
          <SortButton category="votes" sortBy={this.sortBy} />
        </div>

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
    const { category } = this.state;
    api
      .fetchArticles({ category })
      .then(articles => this.setState({ articles }));
  };

  sortBy = category => {
    this.setState({ category });
  };
}

export default Articles;
