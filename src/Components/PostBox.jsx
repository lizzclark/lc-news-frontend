import React from 'react';
import './PostBox.css';
import * as api from '../api';

class PostBox extends React.Component {
  state = { title: '', selectedTopic: this.props.topic, body: '' };

  render() {
    const { topics } = this.props;
    const { title, body, selectedTopic } = this.state;
    return (
      <form className="article-postbox" onSubmit={this.handleSubmit}>
        <label for="title">Title:</label>
        <input
          onChange={this.handleTitleInput}
          type="text"
          name="title"
          value={title}
        />
        <br />
        <label for="topic">Topic:</label>
        <select
          onChange={this.handleTopicInput}
          name="topic"
          value={selectedTopic}
        >
          {topics.map(topicObj => {
            return (
              <option key={topicObj.slug} name={topicObj.slug}>
                {topicObj.slug}
              </option>
            );
          })}
        </select>
        <br />
        <label for="body">Body:</label>
        <textarea onChange={this.handleBodyInput} name="body" value={body} />
        <br />
        <button>Submit</button>
      </form>
    );
  }

  handleTitleInput = ({ target }) => {
    this.setState({ title: target.value });
  };
  handleTopicInput = ({ target }) => {
    this.setState({ selectedTopic: target.value });
  };
  handleBodyInput = ({ target }) => {
    this.setState({ body: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, body } = this.state;
    const topic = this.state.selectedTopic;
    const { username } = this.props.user;
    const { togglePostBox } = this.props;
    return api
      .postArticle({ title, topic, body, username })
      .then(res => {
        togglePostBox();
        return this.setState({ title: '', body: '', topic: '' });
      })
      .catch(console.log);
  };
}

export default PostBox;
