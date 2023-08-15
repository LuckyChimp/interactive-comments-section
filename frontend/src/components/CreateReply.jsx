import { useContext, useState } from "react";

import { CommentsDataContext } from "../App";
import { createReply, fetchComments } from "../api";
import LazyAvatar from "./LazyAvatar";

import { toast } from "react-toastify";

const CreateReply = ({ replyingTo, hideMe }) => {
    const { setCommentsData } = useContext(CommentsDataContext);

    const [text, setText] = useState('');


    const handleCreateReply = () => {
        if (text) {
            createReply(text, process.env.REACT_APP_CURRENT_USER_ID, replyingTo).then(createdReplyData => {
                fetchComments().then(commentsData => {
                    hideMe();
                    setCommentsData(commentsData);
                });
            });
        } else {
            toast.error('For your reply to be posted, please enter some text.');
        }
    }

    const onKeyDown = (event) => {
        if (event.ctrlKey && event.key === 'Enter' && !event.repeat) {
            handleCreateReply();
        }
    };


    return (
        <div className="comment-reply-section">
            <LazyAvatar
                userID={process.env.REACT_APP_CURRENT_USER_ID}
                width="2.5rem"
                height="2.5rem"
                className="comment-author-profile-photo"
                alt="author"
            />
            <textarea
                onInput={event => setText(event.target.value)}
                onKeyDown={(event) => onKeyDown(event)}
                value={text}
                className="comment-input"
                placeholder="Add a reply..."
                rows="3"
                spellCheck={false}
                autoFocus />
            <button
                onClick={() => handleCreateReply()}
                className="comment-reply comment-action-button">
                Reply
            </button>
        </div>
    )
}

export default CreateReply;