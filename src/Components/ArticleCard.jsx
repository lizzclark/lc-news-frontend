import React from 'react';
import { Link } from '@reach/router';
import './ArticleCard.css';
import Voter from './Voter';
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
    const { user } = this.props;
    const { isDeleted } = this.state;
    if (isDeleted) return null;
    return (
      <div className="article-card">
        <Link to={`/articles/${article_id}`}>
          <h2>{title}</h2>
        </Link>
        <p>
          by <Link to={`/users/${author}`}>{author}</Link>
        </p>
        <p>
          in <Link to={`/topics/${topic}/`}>{topic}</Link>
        </p>
        <p>{new Date(created_at).toString().slice(0, 24)} </p>
        <Voter
          user={user}
          article_id={article_id}
          votes={votes}
          resourceAuthor={author}
        />
        <p>
          <Link to={`/articles/${article_id}`}>{comment_count} comments</Link>
        </p>
        {user.username === author && (
          <button onClick={this.handleClick} className="delete-button">
            Delete
          </button>
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
