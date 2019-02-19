import React from 'react';
import * as api from '../api';

class CommentCard extends React.Component {
  render() {
    const { comment, user } = this.props;
    return (
      <div className="comment-card">
        <h3>{comment.author} said:</h3>
        <p>{comment.created_at}</p>
        <p>{comment.body}</p>
        <p>{comment.votes} votes</p>
        {user.username === comment.author && (
          <button onClick={() => this.handleClick(comment.comment_id)}>
            delete
          </button>
        )}
      </div>
    );
  }

  handleClick = comment_id => {
    const { article_id } = this.props;
    api
      .deleteComment({ article_id, comment_id })
      .then(res =>
        console.log(
          'this is where we need to re-render the whole comments component'
        )
      );
  };
}

export default CommentCard;
