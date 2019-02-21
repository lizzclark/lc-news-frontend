import React, { Component } from 'react';
import { Link } from '@reach/router';
import TopicPostBox from './TopicPostBox';
import './Topics.css';
import * as api from '../api';

class Topics extends Component {
  state = { topics: [], isLoading: true };
  componentDidMount() {
    this.fetchTopics();
  }
  render() {
    const { topics, isLoading } = this.state;
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
    api.getTopics().then(topics => this.setState({ topics, isLoading: false }));
  };
}

export default Topics;
