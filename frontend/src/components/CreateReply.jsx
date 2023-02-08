import { useState } from "react";

import LazyAvatar from "./LazyAvatar";

const CreateReply = ({ }) => {
    const currentUser = null;
    const replyingTo = 'placeholder';

    const [text, setText] = useState('');

    return (
        <div className="comment-reply-section">
            <LazyAvatar userID={process.env.REACT_APP_CURRENT_USER_ID} width="2.5rem" height="2.5rem" className="comment-author-profile-photo" alt="author" />
            <textarea
                onInput={e => setText(e.target.value)}
                value={text}
                className="comment-input"
                placeholder="Add a reply..."
                rows="3"
                autoFocus />
            <button
                onClick={() => {
                    // hideMe();
                    // return onReplyClick(replyingTo, text);
                }}
                className="comment-reply comment-action-button">
                Reply
            </button>
        </div>
    )
}

export default CreateReply;