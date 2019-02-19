import React from 'react';
import './PostBox.css';

const PostBox = ({ comments }) => {
  let boxClass;
  if (comments) boxClass = 'comment-postbox';
  return (
    <div className={boxClass}>
      <textarea name="body" />
      <br />
      <button>Submit</button>
    </div>
  );
};

export default PostBox;
