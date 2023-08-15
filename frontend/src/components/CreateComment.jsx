import { useContext, useState } from "react";

import { CommentsDataContext } from "../App";
import { createComment } from "../api";
import LazyAvatar from './LazyAvatar';

import { toast } from "react-toastify";

const CreateComment = () => {
    const { commentsData, setCommentsData } = useContext(CommentsDataContext);

    const [text, setText] = useState('');


    const handleCreateComment = () => {
        if (text) {
            createComment(text, process.env.REACT_APP_CURRENT_USER_ID).then(createdCommentData => {
                setCommentsData([...commentsData, createdCommentData]);
                setText(''); // empty the textarea field for next comment creation
            });
        } else {
            toast.error('For your comment to be posted, please enter some text.');
        }
    };

    const onKeyDown = (event) => {
        if (event.ctrlKey && event.key === 'Enter' && !event.repeat) {
            handleCreateComment();
        }
    };

    const onSendClick = () => {
        handleCreateComment();
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
                value={text}
                onInput={event => setText(event.target.value)}
                onKeyDown={event => onKeyDown(event)}
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