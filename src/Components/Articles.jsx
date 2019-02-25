import React, { Component } from 'react';
import * as api from '../api';
import Newspaper from './Newspaper';
import PostBox from './PostBox';
import ErrorPage from './ErrorPage';
import './Articles.css';

class Articles extends Component {
  state = {
    articles: [],
    category: 'created_at',
    direction: 'desc',
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
    const categoryChanged = prevState.category !== this.state.category;
    const topicChanged = prevProps.topic !== this.props.topic;
    const sortChanged = prevState.direction !== this.state.direction;
    const nextPage = prevState.page !== this.state.page;

    if (categoryChanged || topicChanged || sortChanged || nextPage) {
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
    console.log(this.state);
    if (hasError) return <ErrorPage message={"Can't load articles"} />;
    return (
      <>
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

        {!isLoading ? (
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
        ) : (
          <h2>Loading articles...</h2>
        )}

        {articles.length === 0 && !isLoading && hasAllArticles && (
          <p>No articles yet.</p>
        )}
        {!isLoading && hasAllArticles && articles.length !== 0 && (
          <p>No more articles.</p>
        )}
      </>
    );
  }

  fetchArticles = () => {
    const { category, page, direction } = this.state;
    const { topic } = this.props;
    return api
      .getArticles({ category, topic, page, direction })
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
    const sortRefObj = {
      newest: ['created_at', 'desc'],
      oldest: ['created_at', 'asc'],
      'comments high-low': ['comment_count', 'desc'],
      'comments low-high': ['comment_count', 'asc'],
      'votes low-high': ['votes', 'asc'],
      'votes high-low': ['votes', 'desc']
    };
    return this.setState({
      category: sortRefObj[value][0],
      direction: sortRefObj[value][1],
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
