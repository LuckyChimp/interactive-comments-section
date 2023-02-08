import { useState } from "react";
import LazyAvatar from './LazyAvatar';

const CreateComment = ({ }) => {
    const [text, setText] = useState('');

    return (
        <div className="comment-create">
            <LazyAvatar userID={process.env.REACT_APP_CURRENT_USER_ID} className="comment-author-profile-photo" alt="author" />
            <textarea
                onInput={e => setText(e.target.value)}
                value={text}
                className="comment-input"
                placeholder="Add a comment..."
                rows="3"
                autoFocus />
            <button
                onClick={() => {
                    // onCommentSendClick(text);
                    setText('');
                }}
                className="comment-action-button">
                Send
            </button>
        </div>
    )
}

export default CreateComment;