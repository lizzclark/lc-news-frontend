import React, { Component } from 'react';
import { Link } from '@reach/router';
import TopicPostBox from './TopicPostBox';
import ErrorPage from './ErrorPage';
import './Topics.css';
import * as api from '../api';

class Topics extends Component {
  state = { topics: [], isLoading: true, hasError: false };
  componentDidMount() {
    this.fetchTopics();
  }
  render() {
    const { topics, isLoading, hasError } = this.state;
    if (hasError) return <ErrorPage message={"Can't load topics"} />;
    if (isLoading) return <h2>Loading topics...</h2>;
    const topicSlugs = topics.map(topic => topic.slug).sort();
    return (
      <>
        <div className="topics">
          {topicSlugs.map(slug => (
            <Link to={slug}>{slug}</Link>
          ))}
        </div>
        <TopicPostBox />
      </>
    );
  }

  fetchTopics = () => {
    api
      .getTopics()
      .then(topics => this.setState({ topics, isLoading: false }))
      .catch(err => this.setState({ hasError: true }));
  };
}

export default Topics;
