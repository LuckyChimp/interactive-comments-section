import { useContext, useState } from "react";

import { CommentsDataContext } from "../App";
import { createComment } from "../api";
import LazyAvatar from './LazyAvatar';

const CreateComment = () => {
    const { commentsData, setCommentsData } = useContext(CommentsDataContext);

    const [text, setText] = useState('');


    const onSendClick = () => {
        createComment(text, process.env.REACT_APP_CURRENT_USER_ID).then(createdCommentData => {
            setCommentsData([createdCommentData, ...commentsData]);
            setText('');
        });
    };


    return (
        <div className="comment-create">
            <LazyAvatar
                userID={process.env.REACT_APP_CURRENT_USER_ID}
                width="2.5rem"
                height="2.5rem"
                className="comment-author-profile-photo"
                alt="author"
            />
            <textarea
                onInput={e => setText(e.target.value)}
                value={text}
                className="comment-input"
                placeholder="Add a comment..."
                rows="3"
                spellCheck={false}
                autoFocus />
            <button
                onClick={() => onSendClick()}
                className="comment-action-button">
                Send
            </button>
        </div>
    )
}

export default CreateComment;