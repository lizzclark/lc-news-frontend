import React, { Component } from 'react';
import CommentCard from './CommentCard';
import CommentPostBox from './CommentPostBox';
import * as api from '../api';

class Comments extends Component {
  state = { comments: [], displayCommentBox: false, isLoading: true, page: 1 };

  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate(prevProps, prevState) {
    const articleChange = prevProps.article_id !== this.props.article_id;
    const toggledCommentBox =
      prevState.displayCommentBox !== this.state.displayCommentBox;
    const newPage = prevState.page !== this.state.page;
    if (articleChange || toggledCommentBox || newPage) {
      this.fetchComments();
    }
  }

  render() {
    const { comments, displayCommentBox, isLoading } = this.state;
    const { article_id, user } = this.props;
    if (isLoading) return <h2>Loading comments...</h2>;
    console.log(this.state);
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
        <button onClick={this.loadMore}>Load more</button>
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
    const { article_id } = this.props;
    const { page } = this.state;
    return api
      .getComments({ article_id, page })
      .then(comments => {
        this.setState(prevState => {
          return {
            isLoading: false,
            comments:
              page === 1 ? comments : [...prevState.comments, ...comments]
          };
        });
      })
      .catch(err => this.setState({ comments: [], isLoading: false }));
  };

  loadMore = () => {
    let prevPage = this.state.page;
    return this.setState({ page: ++prevPage });
  };
}

export default Comments;
