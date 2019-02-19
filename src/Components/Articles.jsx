import React, { Component } from 'react';
import * as api from '../api';
import Newspaper from './Newspaper';
import SortButton from './SortButton';
import PostBox from './PostBox';

class Articles extends Component {
  state = { articles: [], category: 'date', displayPostBox: false };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.category !== this.state.category ||
      prevProps.topic !== this.props.topic
    )
      this.getArticles();
  }

  render() {
    const { articles, displayPostBox } = this.state;
    const { topic } = this.props;
    return (
      <>
        <h2>Viewing all articles{topic && ` in ${topic}`}</h2>

        <div>
          Sort by: <SortButton category="latest" sortBy={this.sortBy} />
          <SortButton category="comments" sortBy={this.sortBy} />
          <SortButton category="votes" sortBy={this.sortBy} />
        </div>

        {articles.length !== 0 ? (
          <>
            <button onClick={this.handleClick}>
              Post an article {displayPostBox ? '⬆' : '⬇'}
            </button>
            {displayPostBox && <PostBox article topic={topic} />}
            <Newspaper articles={articles} />
          </>
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

  handleClick = () => {
    this.setState(prevState =>
      prevState.displayPostBox
        ? this.setState({ displayPostBox: false })
        : this.setState({ displayPostBox: true })
    );
  };
}

export default Articles;
