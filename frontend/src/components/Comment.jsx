import { useState } from "react";

import LazyAvatar from "./LazyAvatar";
import { ReactComponent as PlusIcon } from "../assets/images/icon-plus.svg";
import { ReactComponent as MinusIcon } from "../assets/images/icon-minus.svg";
import { ReactComponent as ReplyIcon } from "../assets/images/icon-reply.svg";
import { ReactComponent as DeleteIcon } from "../assets/images/icon-delete.svg";
import { ReactComponent as EditIcon } from "../assets/images/icon-edit.svg";

const Comment = ({ comment }) => {
    const own = false;
    const replyingTo = 'placeholder';

    const [voted, setVoted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(replyingTo ? '@'.concat(replyingTo, ' ', comment.content) : comment.content);

    const timestampToString = (timestamp) => {
        const now = Date.now();
        const diffInMs = Math.abs(now - timestamp);
        const diff = {
            "seconds": Math.floor(diffInMs / 1000),
            "minutes": Math.floor(diffInMs / 1000 / 60),
            "hours": Math.floor(diffInMs / 1000 / 60 / 60),
            "days": Math.floor(diffInMs / 1000 / 60 / 60 / 24),
            "weeks": Math.floor(diffInMs / 1000 / 60 / 60 / 24 / 7),
            "months": Math.floor(diffInMs / 1000 / 60 / 60 / 24 / (365 / 12)),
            "years": Math.floor(diffInMs / 1000 / 60 / 60 / 24 / 365)
        }

        if (diff.years >= 1) {
            return `${diff.years} year${diff.years > 1 ? 's' : ''} ago`;
        } else if (diff.months >= 1) {
            return `${diff.months} month${diff.months > 1 ? 's' : ''} ago`;
        } else if (diff.weeks >= 1) {
            return `${diff.weeks} week${diff.weeks > 1 ? 's' : ''} ago`;
        } else if (diff.days >= 1) {
            return `${diff.days} day${diff.days > 1 ? 's' : ''} ago`;
        } else if (diff.hours >= 1) {
            return `${diff.hours} hour${diff.hours > 1 ? 's' : ''} ago`;
        } else if (diff.minutes >= 1) {
            return `${diff.minutes} minute${diff.minutes > 1 ? 's' : ''} ago`;
        } else if (diff.seconds >= 1) {
            return `${diff.seconds} second${diff.seconds > 1 ? 's' : ''} ago`;
        }
    }

    return (
        <div className="comment">
            <div className="comment-voter">
                <button
                    disabled={own ? true : false}
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
                <span className="comment-voter-score">{comment.score}</span>
                <button
                    disabled={own ? true : false}
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
            <div className="comment-main">
                <div className="comment-main-header">
                    <div className="comment-main-header-info">
                        <LazyAvatar userID={comment.user} className="comment-author-profile-photo" alt="author" />
                        <span className="comment-author">{comment.user.username}</span>
                        {own
                            ? <span className="comment-owner-tag">you</span>
                            : ''
                        }
                        <span className="comment-created">{timestampToString(comment.createdAt)}</span>
                    </div>
                    <div className="comment-main-header-actions">
                        {!own
                            ? <button
                                onClick={() => { }}
                                className="comment-main-header-reply comment-main-header-action">
                                <ReplyIcon className="comment-main-header-reply-icon comment-main-header-action-icon" />
                                Reply
                            </button>
                            : ''
                        }
                        {own
                            ? <button
                                onClick={() => { }}
                                className="comment-main-header-delete comment-main-header-action">
                                <DeleteIcon className="comment-main-header-delete-icon comment-main-header-action-icon" />
                                Delete
                            </button>
                            : ''
                        }
                        {own
                            ? <button
                                onClick={() => setEditMode(!editMode)}
                                className="comment-main-header-edit comment-main-header-action">
                                <EditIcon className="comment-main-header-edit-icon comment-main-header-action-icon" />
                                Edit
                            </button>
                            : ''
                        }
                    </div>
                </div>
                {!editMode &&
                    <p className="comment-text">
                        {replyingTo && <span className="comment-text-recipient">@{replyingTo} </span>}
                        {comment.content}
                    </p>}
                {(own && editMode) &&
                    <div className="comment-edit-section">
                        <textarea
                            value={text}
                            onChange={event => setText(event.target.value)}
                            onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
                            className="comment-input"
                            rows="3"
                            autoFocus
                        />
                        <button
                            onClick={() => {
                                // onUpdateClick(comment.id, text);
                                setEditMode(false);
                            }}
                            className="comment-update comment-action-button">
                            Update
                        </button>
                    </div>
                }
            </div>
        </div>
    )
};

export default Comment;