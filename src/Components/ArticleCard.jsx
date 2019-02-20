import React from 'react';
import { Link } from '@reach/router';
import './ArticleCard.css';
import * as api from '../api';

class ArticleCard extends React.Component {
  state = { isDeleted: false };
  render() {
    const {
      article_id,
      title,
      topic,
      created_at,
      comment_count,
      author,
      votes
    } = this.props.article;
    const { username } = this.props.user;
    const { isDeleted } = this.state;
    if (isDeleted) return null;
    return (
      <div className="article-card">
        <Link to={`/articles/${article_id}`}>
          <h2>{title}</h2>
        </Link>
        <br />
        by <Link to={`/users/${author}`}>{author}</Link> <br />
        in <Link to={`/topics/${topic}/`}>{topic}</Link> <br />
        Date: {created_at} <br />
        <button>+</button>
        {votes} votes
        <button>-</button>
        <br />
        <Link to={`/articles/${article_id}`}>{comment_count} comments</Link>
        <br />
        {username === author && (
          <button onClick={this.handleClick}>Delete this article</button>
        )}
      </div>
    );
  }
  handleClick = () => {
    const { article_id } = this.props.article;
    api
      .deleteArticle({ article_id })
      .then(res => this.setState({ isDeleted: true }));
  };
}

export default ArticleCard;
