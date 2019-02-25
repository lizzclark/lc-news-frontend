import React, { Component } from 'react';
import * as api from '../api';
import Newspaper from './Newspaper';
import PostBox from './PostBox';
import ErrorPage from './ErrorPage';
import './Articles.css';

class Articles extends Component {
  state = {
    articles: [],
    sortOption: 'newest',
    page: 1,
    displayPostBox: false,
    topics: [],
    isLoading: true,
    hasError: false,
    hasTopicError: false,
    hasAllArticles: false
  };

  componentDidMount() {
    this.fetchArticles();
    this.fetchTopics();
  }

  componentDidUpdate(prevProps, prevState) {
    const sortChanged = prevState.sortOption !== this.state.sortOption;
    const topicChanged = prevProps.topic !== this.props.topic;
    const nextPage = prevState.page !== this.state.page;

    if (topicChanged || sortChanged || nextPage) {
      this.fetchArticles();
    }
  }

  render() {
    const {
      articles,
      displayPostBox,
      topics,
      isLoading,
      hasError,
      hasTopicError,
      hasAllArticles,
      total_count
    } = this.state;
    const { topic, user } = this.props;
    const justDeleted = this.props.location.state.deletedArticle;
    if (hasError) return <ErrorPage message={"Can't load articles"} />;
    return (
      <>
        {justDeleted && <h3>Successfully deleted.</h3>}
        <h2>
          Viewing {total_count} articles{topic && ` in ${topic}`}
        </h2>
        <button onClick={this.togglePostBox} className="post-box-button">
          Post an article {displayPostBox ? '⬆' : '⬇'}
        </button>
        {displayPostBox && !hasTopicError && (
          <PostBox
            topic={topic}
            topics={topics}
            user={user}
            togglePostBox={this.togglePostBox}
          />
        )}
        {hasTopicError && <ErrorPage message="Can't load topics" />}

        {isLoading && <h2>Loading articles...</h2>}
        {!isLoading && articles.length > 0 && (
          <>
            <div className="sort-input">
              <label for="sort-by">Sort by:</label>
              <select onChange={this.changeSort}>
                <option name="latest">newest</option>
                <option name="latest">oldest</option>
                <option name="latest">comments high-low</option>
                <option name="latest">comments low-high</option>
                <option name="latest">votes high-low</option>
                <option name="latest">votes low-high</option>
              </select>
            </div>
            <Newspaper articles={articles} user={user} />
            {!hasAllArticles && (
              <button onClick={this.loadMore} className="load-more">
                Load more
              </button>
            )}
          </>
        )}
        {!isLoading && articles.length === 0 && hasAllArticles && (
          <p>No articles yet.</p>
        )}
        {!isLoading && articles.length !== 0 && hasAllArticles && (
          <p>No more articles.</p>
        )}
      </>
    );
  }

  fetchArticles = () => {
    const { sortOption, page } = this.state;
    const { topic } = this.props;
    return api
      .getArticles({ topic, page, sortOption })
      .then(({ articles, total_count }) => {
        return this.setState(prevState => {
          const newArticlesLength =
            page === 1
              ? articles.length
              : prevState.articles.length + articles.length;
          return {
            articles:
              page === 1 ? articles : [...prevState.articles, ...articles],
            total_count,
            isLoading: false,
            hasAllArticles: newArticlesLength === +total_count
          };
        });
      })
      .catch(err => this.setState({ hasError: true, isLoading: false }));
  };

  fetchTopics = () => {
    return api
      .getTopics()
      .then(topics => this.setState({ topics }))
      .catch(err => this.setState({ hasTopicError: true }));
  };

  changeSort = ({ target: { value } }) => {
    return this.setState({
      sortOption: value,
      page: 1
    });
  };

  togglePostBox = () => {
    const { displayPostBox } = this.state;
    return displayPostBox
      ? this.setState({ displayPostBox: false })
      : this.setState({ displayPostBox: true });
  };

  loadMore = () => {
    return this.setState(prevState => ({ page: prevState.page + 1 }));
  };
}
export default Articles;
