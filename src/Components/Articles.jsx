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
    page: 1,
    displayPostBox: false,
    topics: [],
    isLoading: true,
    hasError: false,
    hasAllArticles: false
  };

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    const categoryChanged = prevState.category !== this.state.category;
    const topicChanged = prevProps.topic !== this.props.topic;
    const nextPage = prevState.page !== this.state.page;

    if (categoryChanged || topicChanged || nextPage) {
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
      hasAllArticles,
      total_count
    } = this.state;
    const { topic, user } = this.props;
    if (hasError) return <ErrorPage message={"Can't load articles"} />;
    return (
      <>
        <h2>
          Viewing {total_count} articles{topic && ` in ${topic}`}
        </h2>

        <button onClick={this.togglePostBox} className="post-box-button">
          Post an article {displayPostBox ? '⬆' : '⬇'}
        </button>
        {displayPostBox && (
          <PostBox
            topic={topic}
            topics={topics}
            user={user}
            togglePostBox={this.togglePostBox}
          />
        )}

        {!isLoading && articles.length !== 0 ? (
          <>
            <div className="sort-buttons">
              <span>Sort by: </span>
              <SortButton category="latest" sortBy={this.sortBy} />
              <SortButton category="comments" sortBy={this.sortBy} />
              <SortButton category="votes" sortBy={this.sortBy} />
            </div>
            <Newspaper articles={articles} user={user} />
            {hasAllArticles ? (
              <p className="nothing-here">No more articles</p>
            ) : (
              <button onClick={this.loadMore} className="load-more">
                Load more
              </button>
            )}
          </>
        ) : (
          <h2>Loading articles...</h2>
        )}

        {articles.length === 0 && !isLoading && <p>No articles yet.</p>}
      </>
    );
  }

  fetchArticles = () => {
    const { category, page } = this.state;
    const { topic } = this.props;
    return api
      .getArticles({ category, topic, page })
      .then(({ articles, total_count }) => {
        return this.setState(prevState => {
          const newArticlesLength = prevState.articles.length + articles.length;
          return {
            articles:
              page === 1 ? articles : [...prevState.articles, ...articles],
            total_count,
            isLoading: false,
            hasAllArticles: newArticlesLength === +total_count
          };
        });
      })
      .catch(err => this.setState({ hasError: true }));
  };

  sortBy = category => {
    this.setState({ category, page: 1 });
  };

  togglePostBox = () => {
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

  loadMore = () => {
    return this.setState(prevState => ({ page: prevState.page + 1 }));
  };
}
export default Articles;
