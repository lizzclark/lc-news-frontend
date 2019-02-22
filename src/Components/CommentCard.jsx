import React from 'react';
import * as api from '../api';
import './CommentCard.css';
import TimeAgo from 'react-timeago';
import Voter from './Voter';
import ErrorPage from './ErrorPage';

class CommentCard extends React.Component {
  state = { isDeleted: false, hasError: false };
  render() {
    const { isDeleted, hasError } = this.state;
    if (hasError) return <ErrorPage message={"Can't delete comment"} />;
    if (isDeleted) return null;
    const { comment, user, article_id } = this.props;
    return (
      <div className="comment-card">
        <div className="userinfo">
          <h3>{comment.author}</h3>
          <TimeAgo date={comment.created_at} live={false} />
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
      .then(res => this.setState({ isDeleted: true }))
      .catch(err => this.setState({ hasError: true }));
  };
}

export default CommentCard;
