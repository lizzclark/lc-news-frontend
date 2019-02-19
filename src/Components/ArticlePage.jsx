import React, { Component } from 'react';
import * as api from '../api';
import CommentCard from './CommentCard';
import { Link, Router } from '@reach/router';

class ArticlePage extends Component {
  state = { article: {}, comments: [], displayCommentBox: false };

  componentDidMount() {
    this.getArticle();
    this.getComments();
  }

  render() {
    const { article, comments, displayCommentBox } = this.state;
    return (
      <div className="article-page">
        <h1>{article.title}</h1>
        <article>{article.body}</article>
        <div className="comments">
          <h2>Comments</h2>
          <button onClick={this.handleClick}>Post a comment</button>
          {displayCommentBox && (
            <div className="comment-box">I'm the comment box!</div>
          )}
          {comments
            ? comments.map(comment => <CommentCard comment={comment} />)
            : 'Loading comments...'}
        </div>
      </div>
    );
  }

  getArticle = () => {
    const { article_id } = this.props;
    api.fetchArticle(article_id).then(article => this.setState({ article }));
  };

  getComments = () => {
    const { article_id } = this.props;
    api.fetchComments(article_id).then(comments => this.setState({ comments }));
  };

  handleClick = () => {
    this.setState({ displayCommentBox: true });
  };
}

export default ArticlePage;
