import React, { Component } from 'react';
import * as api from '../api';
import Comments from './Comments';
import Voter from './Voter';
import ErrorPage from './ErrorPage';
import { Link } from '@reach/router';
import './ArticlePage.css';

class ArticlePage extends Component {
  state = {
    article: {},
    isLoading: true,
    hasError: false,
    hasDeleteError: false
  };

  componentDidMount() {
    this.fetchArticle();
  }

  render() {
    const { article, isLoading, hasError, hasDeleteError } = this.state;
    const { user } = this.props;
    if (hasError || hasDeleteError)
      return (
        <ErrorPage
          message={
            hasDeleteError ? "Can't delete article..." : "Can't load article..."
          }
        />
      );
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
          {user.username === article.author && (
            <button onClick={this.deleteArticle}>Delete article</button>
          )}
          <Voter
            user={user}
            article_id={article.article_id}
            votes={article.votes}
            resourceAuthor={article.author}
          />
        </article>
        <Comments article_id={article.article_id} user={user} />
      </>
    );
  }

  fetchArticle = () => {
    const { article_id } = this.props;
    api
      .getArticle(article_id)
      .then(article => this.setState({ article, isLoading: false }))
      .catch(err => this.setState({ hasError: true }));
  };

  deleteArticle = () => {
    const { article_id } = this.props;
    api
      .deleteArticle({ article_id })
      .then(res =>
        this.props.navigate('/', { state: { deletedArticle: true } })
      )
      .catch(err => this.setState({ hasDeleteError: true }));
  };
}

export default ArticlePage;
