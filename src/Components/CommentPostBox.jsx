import React from 'react';
import './PostBox.css';

class CommentPostBox extends React.Component {
  render() {
    const { article_id } = this.props;
    console.log('here you can post a comment to article', article_id);
    return (
      <div className="comment-postbox">
        <label for="body">Body:</label>
        <textarea name="body" />
        <br />
        <button>Submit</button>
      </div>
    );
  }
}

export default CommentPostBox;
