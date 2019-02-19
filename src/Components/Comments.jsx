import React, { Component } from 'react';
import CommentCard from './CommentCard';
import CommentPostBox from './CommentPostBox';
import * as api from '../api';

class Comments extends Component {
  state = { comments: [], displayCommentBox: false };

  componentDidMount() {
    this.getComments();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.article_id !== this.props.article_id) {
      this.getComments();
    }
  }

  render() {
    const { comments, displayCommentBox } = this.state;
    const { article_id } = this.props;
    return comments ? (
      <div className="comments">
        <h2>Comments</h2>
        <button onClick={this.handleClick}>
          Post a comment {displayCommentBox ? '⬆' : '⬇'}
        </button>

        {displayCommentBox && <CommentPostBox article_id={article_id} />}
        {comments.map(comment => (
          <CommentCard key={comment.comment_id} comment={comment} />
        ))}
      </div>
    ) : (
      <p>'Loading...'</p>
    );
  }

  handleClick = () => {
    this.setState(prevState =>
      prevState.displayCommentBox
        ? this.setState({ displayCommentBox: false })
        : this.setState({ displayCommentBox: true })
    );
  };

  getComments = () => {
    return api.fetchComments(this.props.article_id).then(comments => {
      this.setState({ comments });
    });
  };
}

export default Comments;
