import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';

class Topics extends Component {
  state = { topics: [] };
  componentDidMount() {
    this.getTopics();
  }
  render() {
    const { topics } = this.state;
    return (
      <div>
        {topics.map(topic => (
          <Link to={topic.slug}>{topic.slug}</Link>
        ))}
      </div>
    );
  }

  getTopics = () => {
    api.fetchTopics().then(topics => this.setState({ topics }));
  };
}

export default Topics;
