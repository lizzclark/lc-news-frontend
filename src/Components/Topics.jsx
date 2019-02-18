import React, { Component } from 'react';
import * as api from '../api';

class Topics extends Component {
  state = { topics: [] };
  componentDidMount() {
    this.getTopics();
  }
  render() {
    const { topics } = this.state;
    return (
      <div className="main">
        {topics.map(topic => (
          <span>{topic.slug}</span>
        ))}
      </div>
    );
  }

  getTopics = () => {
    api.fetchTopics().then(topics => this.setState({ topics }));
  };
}

export default Topics;
