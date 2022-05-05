import { useState } from "react";

const Comment = ({ comment, own, replyingTo, onVoteClick, onDeleteClick, onUpdateClick, onAddReplyClick }) => {
    const [voted, setVoted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(replyingTo ? '@'.concat(replyingTo, ' ', comment.content) : comment.content);

    const avatar = require(`../${comment.user.image.png}`);

    const timestampToString = (timestamp) => {
        const now = Date.now();
        const diffInMs = Math.abs(now-timestamp);
        const diff = {
            "seconds": Math.floor(diffInMs/1000),
            "minutes": Math.floor(diffInMs/1000/60),
            "hours": Math.floor(diffInMs/1000/60/60),
            "days": Math.floor(diffInMs/1000/60/60/24),
            "weeks": Math.floor(diffInMs/1000/60/60/24/7),
            "months": Math.floor(diffInMs/1000/60/60/24/(365/12)),
            "years": Math.floor(diffInMs/1000/60/60/24/365)
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
                        return onVoteClick(comment.id, +1);
                }} className="comment-voter-upvote">+</button>
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
                        return onVoteClick(comment.id, -1);
                }} className="comment-voter-downvote">-</button>
            </div>
            <div className="comment-main">
                <div className="comment-main-header">
                    <div className="comment-main-header-info">
                        <img src={avatar} alt="author" className="comment-author-profile-photo" />
                        <span className="comment-author">{comment.user.username}</span>
                        {own ? <span className="comment-owner-tag">you</span> : ''}
                        <span className="comment-created">{timestampToString(comment.createdAt)}</span>
                    </div>
                    <div className="comment-main-header-actions">
                        {!own ? <button onClick={onAddReplyClick} className="comment-main-header-reply comment-main-header-action">
                            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg" className="comment-main-header-reply-icon comment-main-header-action-icon"><title>reply icon</title><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6" /></svg>
                            Reply
                        </button> : ''}
                        {own ? <button onClick={() => onDeleteClick(comment.id)} className="comment-main-header-delete comment-main-header-action">
                            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg" className="comment-main-header-delete-icon comment-main-header-action-icon"><title>delete icon</title><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368" /></svg>
                            Delete
                        </button> : ''}
                        {own ? <button onClick={() => setEditMode(!editMode)} className="comment-main-header-edit comment-main-header-action">
                            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" className="comment-main-header-edit-icon comment-main-header-action-icon"><title>edit icon</title><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6" /></svg>
                            Edit
                        </button> : ''}
                    </div>
                </div>
                {!editMode && <p className="comment-text">
                    {replyingTo && <span className="comment-text-recipient">@{replyingTo} </span>}
                    {comment.content}
                </p>}
                {(own && editMode) && <div className="comment-edit-section">
                    <textarea
                        value={text}
                        onChange={event => setText(event.target.value)}
                        onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
                        className="comment-input" rows="3" autoFocus></textarea>
                    <button onClick={() => {
                        onUpdateClick(comment.id, text);
                        setEditMode(false);
                    }} className="comment-update comment-action-button">Update</button>
                </div>}
            </div>
        </div>
    )
};

export default Comment;