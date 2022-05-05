import { useState } from "react";

const CreateReply = ({ currentUser, replyingTo, onReplyClick, hideMe }) => {
    const [text, setText] = useState('');

    const avatar = require(`../${currentUser.image.png}`);

    return (
        <div className="comment-reply-section">
            <img src={avatar} className="comment-author-profile-photo" alt="author"></img>
            <textarea onInput={e => setText(e.target.value)} value={text} className="comment-input" placeholder="Add a reply..." rows="3" autoFocus></textarea>
            <button onClick={() => {
                hideMe();
                return onReplyClick(replyingTo, text);
            }} className="comment-reply comment-action-button">Reply</button>
        </div>
    )
}

export default CreateReply;