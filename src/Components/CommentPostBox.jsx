import React from 'react';
import './PostBox.css';
import * as api from '../api';

class CommentPostBox extends React.Component {
  state = { body: '' };

  render() {
    const { body } = this.state;
    console.log(this.state);
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
        />
        <br />
        <button onClick={this.handleSubmit}>Publish</button>
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
      .catch(console.log);
  };
}

export default CommentPostBox;
