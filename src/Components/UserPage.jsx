import React, { Component } from 'react';
import * as api from '../api';
import Newspaper from './Newspaper';

class UserPage extends Component {
  state = { articles: [], total_count: 0 };

  componentDidMount() {
    this.getUserArticles();
  }
  render() {
    const { articles, total_count } = this.state;
    const { username } = this.props;
    return (
      <div>
        <h1>Articles by {username}</h1>
        <p>
          {username} has written {total_count} articles
        </p>
        {articles.length !== 0 ? (
          <Newspaper articles={articles} />
        ) : (
          'Loading...'
        )}
      </div>
    );
  }
  getUserArticles = () => {
    const { username } = this.props;
    api
      .fetchUserArticles(username)
      .then(({ articles, total_count }) =>
        this.setState({ articles, total_count })
      );
  };
}

export default UserPage;
