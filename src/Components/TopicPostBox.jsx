import React from 'react';
import './PostBox.css';
import * as api from '../api';
import { navigate } from '@reach/router';
import ErrorPage from './ErrorPage';

class TopicPostBox extends React.Component {
  state = { slug: '', description: '', hasError: false };

  render() {
    const { description, slug, hasError } = this.state;
    if (hasError)
      return (
        <ErrorPage
          message={"Can't add topic. Maybe it already exists?"}
          isLinkedHome
        />
      );
    return (
      <>
        <h2>Don't like these? Add a topic:</h2>
        <form className="topic-postbox" onSubmit={this.handleSubmit}>
          <label for="slug" className="slug-label">
            Topic:
          </label>
          <input
            type="text"
            name="slug"
            value={slug}
            className="slug"
            onChange={this.handleSlugChange}
          />
          <label for="description" className="desc-label">
            Description:
          </label>
          <textarea
            name="description"
            onChange={this.handleDescChange}
            value={description}
            className="desc"
          />
          <br />
          <button onClick={this.handleSubmit}>Add</button>
        </form>
      </>
    );
  }

  handleDescChange = ({ target }) => {
    this.setState({ description: target.value });
  };
  handleSlugChange = ({ target }) => {
    this.setState({ slug: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { slug, description } = this.state;
    api
      .postTopic({ slug, description })
      .then(res => navigate(`/topics/${slug}`))
      .catch(err => this.setState({ hasError: true }));
    this.setState({ slug: '', description: '' });
  };
}

export default TopicPostBox;
