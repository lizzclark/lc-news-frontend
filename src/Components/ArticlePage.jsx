import React, { Component } from 'react';
import * as api from '../api';
import CommentCard from './CommentCard';

class ArticlePage extends Component {
  state = { article: {}, comments: [] };

  componentDidMount() {
    this.getArticle();
    this.getComments();
  }

  render() {
    const { article, comments } = this.state;
    return (
      <div className="article-page">
        <h1>{article.title}</h1>
        <br />
        {article.body}
        {comments
          ? comments.map(comment => <CommentCard comment={comment} />)
          : 'Loading comments...'}
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
}

export default ArticlePage;
