import { useState } from "react";

import CommentVoter from "./CommentVoter";
import CommentHeader from "./CommentHeader";
import CommentText from "./CommentText";
import CommentEditSection from "./CommentEditSection";

const Comment = ({ commentData }) => {
    const own = commentData.user === process.env.REACT_APP_CURRENT_USER_ID; // check if comment is from current user and set 'own' accordingly
    const replyingTo = commentData.replyingTo;

    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(commentData.content);

    const onUpdateClick = () => {
        // update comment text in db
        setEditMode(false);
    }


    return (
        <div className="comment">
            <CommentVoter score={commentData.score} own={own} />
            <div className="comment-main">
                <CommentHeader userID={commentData.user} createdAt={commentData.createdAt} own={own} onEditClick={() => setEditMode(!editMode)} />
                {!editMode && <CommentText text={text} replyingTo={replyingTo} />}
                {(own && editMode) && <CommentEditSection text={text} onTextareaChange={text => setText(text)} onUpdateClick={() => onUpdateClick()} />
                }
            </div>
        </div>
    )
};

export default Comment;