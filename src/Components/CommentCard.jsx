import React from 'react';

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <h3>{comment.author} said:</h3>
      <p>{comment.created_at}</p>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>
    </div>
  );
};

export default CommentCard;
