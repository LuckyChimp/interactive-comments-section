import { useState, useContext } from "react";

import { CommentsDataContext } from "../../App";
import { updateText } from "../../api";
import CommentVoter from "./CommentVoter";
import CommentHeader from "./CommentHeader";
import CommentText from "./CommentText";
import CommentEditSection from "./CommentEditSection";

const Comment = ({ commentData, onReplyClick, onDeleteClick }) => {
    const own = commentData.user === process.env.REACT_APP_CURRENT_USER_ID; // check if comment is from current user and set 'own' accordingly

    const { commentsData, setCommentsData } = useContext(CommentsDataContext);

    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(commentData.content);


    const onUpdateText = (newText) => {
        updateText(commentData._id, newText).then(commentData => {
            setEditMode(false);
            setText(newText);
            setCommentsData(commentsData.map(_commentData => _commentData._id === commentData._id ? commentData : _commentData));
        });
    }


    return (
        <div className="comment">
            <CommentVoter
                commentID={commentData._id}
                initialScore={commentData.score}
                own={own}
            />
            <div className="comment-main">
                <CommentHeader
                    userID={commentData.user}
                    commentID={commentData._id}
                    createdAt={commentData.createdAt}
                    own={own}
                    onReplyClick={() => onReplyClick()}
                    onDeleteClick={(commentID) => onDeleteClick(commentID)}
                    onEditClick={() => setEditMode(!editMode)}
                />
                {
                    !editMode &&
                    <CommentText
                        text={text}
                        replyingTo={commentData.replyingTo}
                    />
                }
                {
                    (own && editMode) &&
                    <CommentEditSection
                        text={text}
                        onUpdateText={(newText) => onUpdateText(newText)}
                    />
                }
            </div>
        </div>
    )
};

export default Comment;