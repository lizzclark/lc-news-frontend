import React from 'react';
import { Link } from '@reach/router';

class ArticleCard extends React.Component {
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
    return (
      <div>
        <Link to={`/articles/${article_id}`}>{title}</Link>
        <br />
        by <Link to={`/users/${author}`}>{author}</Link> <br />
        in <Link to={`/topics/${topic}/`}>{topic}</Link> <br />
        Date: {created_at} <br />
        {votes} votes <br />
        <Link to={`/articles/${article_id}`}>{comment_count} comments</Link>
        <br />
        {username === author && (
          <button onClick={this.handleClick}>Delete this article</button>
        )}
        <hr />
      </div>
    );
  }
  handleClick = () => {
    console.log('lol nothing yet');
  };
}

export default ArticleCard;
