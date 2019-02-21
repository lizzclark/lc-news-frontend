import React from 'react';
import * as api from '../api';
import './CommentCard.css';
import Voter from './Voter';

class CommentCard extends React.Component {
  state = { isDeleted: false };
  render() {
    const { isDeleted } = this.state;
    if (isDeleted) return null;
    const { comment, user, article_id } = this.props;
    const dateString = new Date(comment.created_at).toString().slice(0, 25);
    return (
      <div className="comment-card">
        <div className="userinfo">
          <h3>{comment.author}</h3>
          <p>{dateString}</p>
          <Voter
            user={user}
            resourceAuthor={comment.author}
            votes={comment.votes}
            article_id={article_id}
            comment_id={comment.comment_id}
          />
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
