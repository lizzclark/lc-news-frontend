import React, { Component } from 'react';
import * as api from '../api';
import Newspaper from './Newspaper';
import ErrorPage from './ErrorPage';

class UserPage extends Component {
  state = { articles: [], total_count: 0, isLoading: true, hasError: false };

  componentDidMount() {
    this.fetchUserArticles();
  }
  render() {
    const { articles, total_count, isLoading, hasError } = this.state;
    const { user, username } = this.props;
    if (hasError) return <ErrorPage message={"Can't load articles"} />;
    if (isLoading) return <h2>Loading articles...</h2>;
    return (
      <div>
        <h1>Articles by {username}</h1>
        <p>
          {username} has written {total_count} articles
        </p>
        {articles.length !== 0 ? (
          <Newspaper articles={articles} user={user} />
        ) : (
          'Loading...'
        )}
      </div>
    );
  }
  fetchUserArticles = () => {
    const { username } = this.props;
    api
      .getUserArticles(username)
      .then(({ articles, total_count }) =>
        this.setState({ articles, total_count, isLoading: false })
      )
      .catch(err => this.setState({ hasError: true }));
  };
}

export default UserPage;
