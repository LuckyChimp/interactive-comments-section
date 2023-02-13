import { useState } from "react";

import Comment from "./Comment/Comment";
import CreateReply from "./CreateReply";
import CommentReplies from "./CommentReplies";

const Comments = ({ commentsData, onDeleteClick }) => {
    const sort = (a, b) => {
        if (a.score > b.score) {
            return -1;
        }
        if (a.score < b.score) {
            return 1;
        }
        return 0;
    };


    return (
        <div className="comments">
            {commentsData && commentsData.sort(sort).map(commentData => (
                <CommentWrapper commentData={commentData} onDeleteClick={(commentID) => onDeleteClick(commentID)} key={commentData._id} />
            ))}
        </div>
    );
};

const CommentWrapper = ({ commentData, onDeleteClick }) => {
    const [replyMode, setReplyMode] = useState(false);

    const isReply = (commentData) => {
        return commentData.replyingTo ? true : false;
    };

    return (
        <div className="comment-wrapper">
            {!isReply(commentData) && <Comment commentData={commentData} onReplyClick={() => setReplyMode(!replyMode)} onDeleteClick={(commentID) => onDeleteClick(commentID)} />}
            {replyMode && <CreateReply />}
            {commentData.replies.length > 0 &&
                <CommentReplies replyIDs={commentData.replies} onDeleteClick={(commentID) => onDeleteClick(commentID)} />
            }
        </div>
    );
};

export default Comments;