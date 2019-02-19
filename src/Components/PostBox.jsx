import React from 'react';
import './PostBox.css';

const PostBox = ({ comment, article, topic }) => {
  let boxClass;
  if (comment) boxClass = 'comment-postbox';
  if (article) boxClass = 'article-postbox';
  return (
    <div className={boxClass}>
      {article && (
        <>
          <label for="title">Title:</label>
          <input type="text" name="title" /> <br />
          <label for="topic">Topic:</label>
          <select name="topic">
            <option>topic 1</option>
          </select>
          <br />
        </>
      )}
      <label for="body">Body:</label>
      <textarea name="body" />
      <br />
      <button>Submit</button>
      {topic}
    </div>
  );
};

export default PostBox;
