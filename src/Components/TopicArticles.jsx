import React, { Component } from 'react';
import * as api from '../api';
import Newspaper from './Newspaper';

class TopicArticles extends Component {
  state = { articles: [] };

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { articles } = this.state;
    const { topic } = this.props;
    return (
      <>
        <h2>Viewing all articles for {topic}</h2>
        <p>Buttons to toggle sort order</p>
        <p>
          Expanding box where you can post an article - the topic we're in
          should be auto selected here
        </p>
        {articles.length !== 0 ? (
          <Newspaper articles={articles} />
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  }

  getArticles = () => {
    api
      .fetchArticles(this.props.topic)
      .then(articles => this.setState({ articles }));
  };
}

export default TopicArticles;
