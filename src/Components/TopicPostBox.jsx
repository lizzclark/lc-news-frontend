import React from 'react';
import './PostBox.css';
import * as api from '../api';

class TopicPostBox extends React.Component {
  state = { slug: '', description: '' };

  render() {
    const { description, slug } = this.state;
    return (
      <>
        <h2>Don't like these? Add a topic:</h2>
        <form className="topic-postbox" onSubmit={this.handleSubmit}>
          <label for="slug">Topic:</label>
          <input
            type="text"
            name="slug"
            value={slug}
            onChange={this.handleSlugChange}
          />
          <label for="description" className="description-label">
            Description:
          </label>
          <textarea
            name="description"
            onChange={this.handleDescChange}
            value={description}
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
    return api
      .postTopic({ slug, description })
      .then(res => console.log(res))
      .catch(console.log);
  };
}

export default TopicPostBox;
