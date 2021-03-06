import React, { Component } from 'react';
import CommentCard from './CommentCard';
import CommentPostBox from './CommentPostBox';
import * as api from '../api';
import ErrorPage from './ErrorPage';

class Comments extends Component {
  state = {
    comments: [],
    displayCommentBox: false,
    isLoading: true,
    page: 1,
    hasError: false
  };

  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate(prevProps, prevState) {
    const articleChange = prevProps.article_id !== this.props.article_id;
    const newPage = prevState.page !== this.state.page;
    if (articleChange || newPage) {
      this.fetchComments();
    }
  }

  render() {
    const {
      comments,
      displayCommentBox,
      isLoading,
      hasAllComments,
      hasError
    } = this.state;
    const { article_id, user, comment_count } = this.props;
    if (hasError) return <ErrorPage message="Can't load comments" />;
    if (isLoading) return <h2>Loading comments...</h2>;
    return (
      <div className="comments">
        <h2>{comment_count} comments</h2>
        <button onClick={this.handleClick}>
          Post a comment {displayCommentBox ? '⬆' : '⬇'}
        </button>

        {displayCommentBox && (
          <CommentPostBox
            article_id={article_id}
            user={user}
            fetchComments={this.fetchComments}
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
        {hasAllComments && comments.length > 0 && (
          <p className="nothing-here">No more comments</p>
        )}
        {hasAllComments && comments.length === 0 && (
          <p className="nothing-here">No comments yet</p>
        )}
        {!hasAllComments && comments.length !== 0 && (
          <button onClick={this.loadMore} className="load-more">
            Load more
          </button>
        )}
      </div>
    );
  }

  handleClick = () => {
    this.setState(prevState =>
      prevState.displayCommentBox
        ? this.setState({ page: 1, displayCommentBox: false })
        : this.setState({ page: 1, displayCommentBox: true })
    );
  };

  fetchComments = () => {
    const { article_id, comment_count } = this.props;
    const { page } = this.state;
    return api
      .getComments({ article_id, page })
      .then(comments => {
        this.setState(prevState => {
          const newCommentsLength =
            page === 1
              ? comments.length
              : prevState.comments.length + comments.length;
          return {
            isLoading: false,
            comments:
              page === 1 ? comments : [...prevState.comments, ...comments],
            hasAllComments: newCommentsLength >= +comment_count
          };
        });
      })
      .catch(err => this.setState({ isLoading: false, hasError: true }));
  };

  loadMore = () => {
    let prevPage = this.state.page;
    return this.setState({ page: ++prevPage });
  };
}

export default Comments;
