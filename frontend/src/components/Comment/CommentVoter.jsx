import { useState } from "react";

import { ReactComponent as PlusIcon } from "../../assets/images/icon-plus.svg";
import { ReactComponent as MinusIcon } from "../../assets/images/icon-minus.svg";

const CommentVoter = ({ score, own }) => {
    const VotingStates = { // enum-like object
        NotVoted: 'NotVoted',
        Up: 'Up',
        Down: 'Down'
    };


    const [votingState, setVotingState] = useState(VotingStates.NotVoted);


    const onUpvoteClick = () => {
        if (votingState === VotingStates.NotVoted) {
            setVotingState(VotingStates.Up);
        } else if (votingState === VotingStates.Down) {
            setVotingState(VotingStates.NotVoted);
        } else {
            return () => { };
        }
        // return onVoteClick(comment.id, +1);
    };

    const onDownvoteClick = () => {
        if (votingState === VotingStates.NotVoted) {
            setVotingState(VotingStates.Down);
        } else if (votingState === VotingStates.Up) {
            setVotingState(VotingStates.NotVoted);
        } else {
            return () => { };
        }
        // return onVoteClick(comment.id, -1);
    };


    return (
        <div className="comment-voter">
            <button
                disabled={own}
                onClick={() => onUpvoteClick()}
                className="comment-voter-upvote">
                <PlusIcon className="comment-voter-upvote-icon" />
            </button>
            <span className="comment-voter-score">{score}</span>
            <button
                disabled={own}
                onClick={() => onDownvoteClick()}
                className="comment-voter-downvote">
                <MinusIcon className="comment-voter-downvote-icon" />
            </button>
        </div>
    );
}

export default CommentVoter;