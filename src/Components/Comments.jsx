import React, { Component } from 'react';
import CommentCard from './CommentCard';
import CommentPostBox from './CommentPostBox';
import * as api from '../api';

class Comments extends Component {
  state = { comments: [], displayCommentBox: false, isLoading: true };

  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.article_id !== this.props.article_id ||
      prevState.displayCommentBox !== this.state.displayCommentBox
    ) {
      this.fetchComments();
    }
  }

  render() {
    const { comments, displayCommentBox, isLoading } = this.state;
    const { article_id, user } = this.props;
    if (isLoading) return <h2>Loading comments...</h2>;
    return (
      <div className="comments">
        <h2>Comments</h2>
        <button onClick={this.handleClick}>
          Post a comment {displayCommentBox ? '⬆' : '⬇'}
        </button>

        {displayCommentBox && (
          <CommentPostBox
            article_id={article_id}
            user={user}
            toggleCommentBox={this.handleClick}
          />
        )}
        {comments.length > 0 &&
          comments.map(comment => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              user={user}
              article_id={article_id}
            />
          ))}
        {comments.length === 0 && isLoading === false && (
          <p>No comments yet.</p>
        )}
      </div>
    );
  }

  handleClick = () => {
    this.setState(prevState =>
      prevState.displayCommentBox
        ? this.setState({ displayCommentBox: false })
        : this.setState({ displayCommentBox: true })
    );
  };

  fetchComments = () => {
    return api
      .getComments(this.props.article_id)
      .then(comments => {
        this.setState({ comments, isLoading: false });
      })
      .catch(err => this.setState({ comments: [], isLoading: false }));
  };
}

export default Comments;
