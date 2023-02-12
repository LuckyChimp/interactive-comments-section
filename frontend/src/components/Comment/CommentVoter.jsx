import { useState } from "react";

import { ReactComponent as PlusIcon } from "../../assets/images/icon-plus.svg";
import { ReactComponent as MinusIcon } from "../../assets/images/icon-minus.svg";

const CommentVoter = ({ score, own }) => {
    const [voted, setVoted] = useState(false);

    return (
        <div className="comment-voter">
            <button
                disabled={own}
                onClick={() => {
                    if (!voted) {
                        setVoted('up');
                    } else if (voted === 'down') {
                        setVoted(false);
                    } else {
                        return () => { };
                    }
                    // return onVoteClick(comment.id, +1);
                }}
                className="comment-voter-upvote">
                <PlusIcon className="comment-voter-upvote-icon" />
            </button>
            <span className="comment-voter-score">{score}</span>
            <button
                disabled={own}
                onClick={() => {
                    if (!voted) {
                        setVoted('down');
                    } else if (voted === 'up') {
                        setVoted(false);
                    } else {
                        return () => { };
                    }
                    // return onVoteClick(comment.id, -1);
                }}
                className="comment-voter-downvote">
                <MinusIcon className="comment-voter-downvote-icon" />
            </button>
        </div>
    );
}

export default CommentVoter;