import React from 'react';
import './PostBox.css';
import * as api from '../api';
import ErrorPage from './ErrorPage';

class CommentPostBox extends React.Component {
  state = { body: '', hasError: false };

  render() {
    const { body, hasError } = this.state;
    if (hasError) return <ErrorPage message={"Can't post comment."} />;
    return (
      <form className="comment-postbox" onSubmit={this.handleSubmit}>
        <label for="body" className="body-label">
          Comment:
        </label>
        <textarea
          name="body"
          onChange={this.handleChange}
          value={body}
          className="body"
          required
        />
        <br />
        <button>Publish</button>
      </form>
    );
  }

  handleChange = ({ target }) => {
    this.setState({ body: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { article_id, toggleCommentBox } = this.props;
    const { username } = this.props.user;
    const { body } = this.state;
    return api
      .postComment({ article_id, body, username })
      .then(res => toggleCommentBox())
      .catch(err => this.setState({ hasError: true }));
  };
}

export default CommentPostBox;
