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
    const { topic } = this.props;
    return (
      <>
        <h2>Viewing all articles{topic && ` in ${topic}`}</h2>

        <div>
          Sort by: <SortButton category="latest" sortBy={this.sortBy} />
          <SortButton category="comments" sortBy={this.sortBy} />
          <SortButton category="votes" sortBy={this.sortBy} />
        </div>

        <p>
          Expanding box where you can post an article <br />
          {topic && `This should have the topic ${topic} auto selected`}
        </p>

        {articles.length !== 0 ? (
          <Newspaper articles={articles} />
        ) : (
          <div>Loading articles...</div>
        )}
      </>
    );
  }

  getArticles = () => {
    const { category } = this.state;
    const { topic } = this.props;
    api
      .fetchArticles({ category, topic })
      .then(articles => this.setState({ articles }));
  };

  sortBy = category => {
    this.setState({ category });
  };
}

export default Articles;
