import React, { Component } from 'react';
import * as api from '../api';
import Newspaper from './Newspaper';

class UserPage extends Component {
  state = { articles: [] };

  componentDidMount() {
    this.getUserArticles();
  }
  render() {
    const { articles } = this.state;
    const { username } = this.props;
    return (
      <div>
        <h1>Articles by {username}</h1>
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
      .then(articles => this.setState({ articles }));
  };
}

export default UserPage;
