import React from 'react';
import './PostBox.css';

class PostBox extends React.Component {
  state = {};

  render() {
    const { topic, topics } = this.props;
    return (
      <div className="article-postbox">
        <label for="title">Title:</label>
        <input type="text" name="title" /> <br />
        <label for="topic">Topic:</label>
        <select name="topic">
          {topics.map(topicObj => {
            if (topicObj.slug === topic) {
              return (
                <option key={topicObj.slug} selected>
                  {topicObj.slug}
                </option>
              );
            } else {
              return (
                <option key={topicObj.slug} name={topicObj.slug}>
                  {topicObj.slug}
                </option>
              );
            }
          })}
        </select>
        <br />
        <label for="body">Body:</label>
        <textarea name="body" />
        <br />
        <button>Submit</button>
      </div>
    );
  }
}

export default PostBox;
