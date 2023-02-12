import { useState, useEffect } from "react";

import { fetchUser } from "../../api";

import LazyAvatar from "../LazyAvatar";
import { ReactComponent as ReplyIcon } from "../../assets/images/icon-reply.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/icon-delete.svg";
import { ReactComponent as EditIcon } from "../../assets/images/icon-edit.svg";

const CommentHeader = ({ userID, createdAt, own, onReplyClick, onEditClick }) => {
    return (
        <div className="comment-main-header">
            <HeaderInfo userID={userID} createdAt={createdAt} own={own} />
            <HeaderActions own={own} onReplyClick={() => onReplyClick()} onEditClick={() => onEditClick()} />
        </div>
    );
}

const HeaderInfo = ({ userID, createdAt, own }) => {
    const [username, setUsername] = useState(null);

    const timeSince = (date) => {
        const now = Date.now();
        const diffInMs = Math.abs(now - date);
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

    useEffect(() => {
        let active = true;

        fetchUser(userID).then(user => {
            if (active) {
                setUsername(user.username);
            }
        });

        return () => {
            active = false;
        }
    }, [userID]);

    return (
        <div className="comment-main-header-info">
            <LazyAvatar userID={userID} width="2rem" height="2rem" className="comment-author-profile-photo" alt="author" />
            <span className="comment-author">{username}</span>
            {own
                ? <span className="comment-owner-tag">you</span>
                : ''
            }
            <span className="comment-created">{timeSince(new Date(createdAt))}</span>
        </div>
    );
};

const HeaderActions = ({ own, onReplyClick, onEditClick }) => {
    return (
        <div className="comment-main-header-actions">
            {!own
                ? <button
                    onClick={() => onReplyClick()}
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
                    onClick={() => onEditClick()}
                    className="comment-main-header-edit comment-main-header-action">
                    <EditIcon className="comment-main-header-edit-icon comment-main-header-action-icon" />
                    Edit
                </button>
                : ''
            }
        </div>
    );
};

export default CommentHeader;