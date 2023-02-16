import { useContext, useState } from "react";

import { CommentsDataContext } from "../../App";
import { updateScore } from "../../api";
import { ReactComponent as PlusIcon } from "../../assets/images/icon-plus.svg";
import { ReactComponent as MinusIcon } from "../../assets/images/icon-minus.svg";

const CommentVoter = ({ commentID, initialScore, own }) => {
    const VotingStates = { // enum-like object
        NotVoted: 'NotVoted',
        Up: 'Up',
        Down: 'Down'
    };

    const { commentsData, setCommentsData } = useContext(CommentsDataContext);

    const [score, setScore] = useState(initialScore);
    const [votingState, setVotingState] = useState(VotingStates.NotVoted);


    const onUpvoteClick = () => {
        if (votingState === VotingStates.NotVoted) {
            setVotingState(VotingStates.Up);
        } else if (votingState === VotingStates.Down) {
            setVotingState(VotingStates.NotVoted);
        } else {
            return () => { };
        }

        updateScore(commentID, (score + 1)).then(commentData => {
            setScore(score + 1);
            setCommentsData(commentsData.map(_commentData => _commentData._id === commentData._id ? commentData : _commentData));
        });
    };

    const onDownvoteClick = () => {
        if (votingState === VotingStates.NotVoted) {
            setVotingState(VotingStates.Down);
        } else if (votingState === VotingStates.Up) {
            setVotingState(VotingStates.NotVoted);
        } else {
            return () => { };
        }

        updateScore(commentID, (score - 1)).then(commentData => {
            setScore(score - 1);
            setCommentsData(commentsData.map(_commentData => _commentData._id === commentData._id ? commentData : _commentData));
        });
    };


    return (
        <div className="comment-voter">
            <button
                disabled={own || votingState === VotingStates.Up}
                onClick={() => onUpvoteClick()}
                className="comment-voter-upvote">
                <PlusIcon className="comment-voter-upvote-icon" />
            </button>
            <span className="comment-voter-score">{score}</span>
            <button
                disabled={own || votingState === VotingStates.Down}
                onClick={() => onDownvoteClick()}
                className="comment-voter-downvote">
                <MinusIcon className="comment-voter-downvote-icon" />
            </button>
        </div>
    );
}

export default CommentVoter;