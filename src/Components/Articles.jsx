import React, { Component } from 'react';
import * as api from '../api';
import Newspaper from './Newspaper';
import SortButton from './SortButton';
import PostBox from './PostBox';
import ErrorPage from './ErrorPage';
import './Articles.css';

class Articles extends Component {
  state = {
    articles: [],
    category: 'date',
    displayPostBox: false,
    topics: [],
    isLoading: true,
    hasError: false
  };

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
    const {
      articles,
      displayPostBox,
      topics,
      isLoading,
      hasError
    } = this.state;
    const { topic, user } = this.props;
    if (hasError) return <ErrorPage message={"Can't load articles"} />;
    return (
      <>
        <h2>Viewing all articles{topic && ` in ${topic}`}</h2>

        <button onClick={this.handleClick} className="post-box-button">
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

        {!isLoading ? (
          <>
            <div className="sort-buttons">
              <span>Sort by: </span>
              <SortButton category="latest" sortBy={this.sortBy} />
              <SortButton category="comments" sortBy={this.sortBy} />
              <SortButton category="votes" sortBy={this.sortBy} />
            </div>
            <Newspaper articles={articles} user={user} />
          </>
        ) : (
          <h2>Loading articles...</h2>
        )}

        {articles.length === 0 && !isLoading && <p>No articles yet.</p>}
      </>
    );
  }

  fetchArticles = () => {
    const { category } = this.state;
    const { topic } = this.props;
    return api
      .getArticles({ category, topic })
      .then(articles => this.setState({ articles, isLoading: false }))
      .catch(err => this.setState({ hasError: true }));
  };

  sortBy = category => {
    this.setState({ category });
  };

  handleClick = () => {
    if (!this.state.displayPostBox) {
      return api
        .getTopics()
        .then(topics => {
          this.setState({
            displayPostBox: true,
            topics
          });
        })
        .catch(err => this.setState({ hasError: true }));
    } else this.setState({ displayPostBox: false });
  };
}
export default Articles;
