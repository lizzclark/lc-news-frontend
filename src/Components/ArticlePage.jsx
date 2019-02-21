import React, { Component } from 'react';
import * as api from '../api';
import Comments from './Comments';
import Voter from './Voter';
import { Link } from '@reach/router';
import './ArticlePage.css';

class ArticlePage extends Component {
  state = { article: {}, isLoading: true };

  componentDidMount() {
    this.fetchArticle();
  }

  render() {
    const { article, isLoading } = this.state;
    const { user } = this.props;
    if (isLoading) return <h2>Loading article...</h2>;
    return (
      <>
        <article className="article-page">
          <h1>{article.title}</h1>
          <h2>
            by <Link to={`/users/${article.author}`}>{article.author}</Link> in{' '}
            <Link to={`/topics/${article.topic}`}>{article.topic} </Link>
          </h2>
          <p className="article-text">{article.body}</p>
        </article>
        <Voter
          user={user}
          article_id={article.article_id}
          votes={article.votes}
        />
        <Comments article_id={article.article_id} user={user} />
      </>
    );
  }

  fetchArticle = () => {
    const { article_id } = this.props;
    api
      .getArticle(article_id)
      .then(article => this.setState({ article, isLoading: false }));
  };
}

export default ArticlePage;
