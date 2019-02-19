import React from 'react';
import * as api from '../api';
import './CommentCard.css';

class CommentCard extends React.Component {
  render() {
    const { comment, user } = this.props;
    return (
      <div className="comment-card">
        <div className="userinfo">
          <h3>{comment.author}</h3>
          <p>{comment.created_at}</p>
          <p>{comment.votes} votes</p>
          {user.username === comment.author && (
            <button onClick={() => this.handleClick(comment.comment_id)}>
              delete
            </button>
          )}
        </div>
        <p className="body">{comment.body}</p>
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
