import { useState } from "react";

const CreateComment = ({ currentUser, onCommentSendClick }) => {
    const [text, setText] = useState('');

    const avatar = require(`../${currentUser.image.png}`);

    return (
        <div className="comment-create">
            <img src={avatar} alt="author" className="comment-author-profile-photo" />
            <textarea onInput={e => setText(e.target.value)} value={text} className="comment-input" placeholder="Add a comment..." rows="3" autoFocus></textarea>
            <button onClick={() => {
                onCommentSendClick(text);
                setText('');
            }} className="comment-action-button">Send</button>
        </div>
    )
}

export default CreateComment;