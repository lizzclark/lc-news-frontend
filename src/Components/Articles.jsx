import React, { Component } from 'react';
import * as api from '../api';
import Newspaper from './Newspaper';
import SortButton from './SortButton';
import PostBox from './PostBox';

class Articles extends Component {
  state = { articles: [], category: 'date', displayPostBox: false, topics: [] };

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
    const { articles, displayPostBox, topics } = this.state;
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
            {displayPostBox && (
              <PostBox article topic={topic} topics={topics} />
            )}
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
    if (!this.state.displayPostBox) {
      api.fetchTopics().then(topics => {
        this.setState(
          {
            displayPostBox: true,
            topics
          },
          () => console.log('setting state....')
        );
      });
    } else this.setState({ displayPostBox: false });
  };
}
export default Articles;
