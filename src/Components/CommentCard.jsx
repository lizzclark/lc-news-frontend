import React from 'react';
import * as api from '../api';
import './CommentCard.css';

class CommentCard extends React.Component {
  state = { isDeleted: false };
  render() {
    const { isDeleted } = this.state;
    if (isDeleted) return null;
    const { comment, user } = this.props;
    const dateString = new Date(comment.created_at).toString().slice(0, 25);
    return (
      <div className="comment-card">
        <div className="userinfo">
          <h3>{comment.author}</h3>
          <p>{dateString}</p>
          <p>
            <button>+</button>
            {comment.votes} votes
            <button>-</button>
          </p>
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
      .then(res => this.setState({ isDeleted: true }));
  };
}

export default CommentCard;
