import React, { Component } from 'react';
import * as api from '../api';
import Newspaper from './Newspaper';
import SortButton from './SortButton';
import PostBox from './PostBox';

class Articles extends Component {
  state = { articles: [], category: 'date', displayPostBox: false, topics: [] };

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.category !== this.state.category ||
      prevProps.topic !== this.props.topic ||
      prevState.displayPostBox !== this.state.displayPostBox
    )
      this.fetchArticles();
  }

  render() {
    const { articles, displayPostBox, topics } = this.state;
    const { topic, user } = this.props;
    return (
      <>
        <h2>Viewing all articles{topic && ` in ${topic}`}</h2>

        <button onClick={this.handleClick}>
          Post an article {displayPostBox ? '⬆' : '⬇'}
        </button>
        {displayPostBox && (
          <PostBox
            topic={topic}
            topics={topics}
            user={user}
            togglePostBox={this.handleClick}
          />
        )}

        {articles.length !== 0 ? (
          <>
            <div>
              Sort by: <SortButton category="latest" sortBy={this.sortBy} />
              <SortButton category="comments" sortBy={this.sortBy} />
              <SortButton category="votes" sortBy={this.sortBy} />
            </div>
            <Newspaper articles={articles} user={user} />
          </>
        ) : (
          <div>Loading articles...</div>
        )}
      </>
    );
  }

  fetchArticles = () => {
    const { category } = this.state;
    const { topic } = this.props;
    api
      .getArticles({ category, topic })
      .then(articles => this.setState({ articles }));
  };

  sortBy = category => {
    this.setState({ category });
  };

  handleClick = () => {
    if (!this.state.displayPostBox) {
      api.getTopics().then(topics => {
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
