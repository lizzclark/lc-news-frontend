import React from 'react';

const CommentCard = ({ comment }) => {
  return (
    <div>
      {comment.author} said:
      <br />
      {comment.body}
    </div>
  );
};

export default CommentCard;
