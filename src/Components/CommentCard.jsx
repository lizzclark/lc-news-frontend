import React from 'react';

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <h3>{comment.author} said:</h3>
      <br />
      {comment.body}
    </div>
  );
};

export default CommentCard;
