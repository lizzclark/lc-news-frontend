import React from 'react';
import './PostBox.css';
import ErrorPage from './ErrorPage';
import { navigate } from '@reach/router';
import * as api from '../api';

class PostBox extends React.Component {
  state = {
    title: '',
    selectedTopic: this.props.topic || 'coding',
    body: '',
    hasError: false
  };

  render() {
    const { topics } = this.props;
    const { title, body, selectedTopic, hasError } = this.state;
    if (hasError) return <ErrorPage message={"Can't post article."} />;
    return (
      <form className="article-postbox" onSubmit={this.handleSubmit}>
        <label for="title" className="title-label">
          Title:
        </label>
        <input
          onChange={this.handleTitleInput}
          type="text"
          name="title"
          className="title"
          value={title}
          required
        />
        <br />
        <label for="topic" className="topic-label">
          Topic:
        </label>
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
        <label for="body" className="body-label">
          Body:
        </label>
        <textarea
          onChange={this.handleBodyInput}
          name="body"
          className="body"
          value={body}
          required
        />
        <br />
        <button>Publish</button>
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
    const { title, body, selectedTopic } = this.state;
    const { username } = this.props.user;
    const { togglePostBox } = this.props;
    return api
      .postArticle({
        title,
        topic: selectedTopic,
        body,
        username
      })
      .then(({ article }) => {
        togglePostBox();
        this.setState({ title: '', body: '', topic: '' });
        navigate(`/articles/${article.article_id}`);
      })
      .catch(err => this.setState({ hasError: true }));
  };
}

export default PostBox;
