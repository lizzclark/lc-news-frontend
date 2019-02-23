import React, { Component } from 'react';
import * as api from '../api';
import './Voter.css';

class Voter extends Component {
  state = { voteChange: 0 };
  render() {
    const { votes, user, resourceAuthor } = this.props;
    const { voteChange } = this.state;
    if (user.username === resourceAuthor) {
      return <p className="voter-votes-only">{votes} votes</p>;
    }
    return (
      <div className="voter">
        <button
          onClick={() => this.vote(1)}
          disabled={voteChange > 0}
          className="up"
        >
          +
        </button>
        <div className="votes">{votes + voteChange} votes</div>
        <button
          onClick={() => this.vote(-1)}
          disabled={voteChange < 0}
          className="down"
        >
          -
        </button>
      </div>
    );
  }
  vote = newVoteValue => {
    const { article_id, comment_id } = this.props;
    api.patchResource({ article_id, comment_id, inc_votes: newVoteValue });
    this.setState(prevState => {
      return { voteChange: prevState.voteChange + newVoteValue };
    });
  };
}

export default Voter;
