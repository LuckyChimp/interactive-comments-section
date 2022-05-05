import Comment from "./Comment";
import CreateReply from "./CreateReply";
import CommentReplies from "./CommentReplies";
import { useState } from "react";

const Comments = ({ comments, currentUser, onVoteClick, onDeleteClick, onUpdateClick, onReplyClick }) => {
    const [editModes, setEditModes] = useState(new Array(comments.length).fill(undefined));

    // order comments by score
    const sortedComments = () => {
        const sorted = comments.sort((a, b) => b.score - a.score);
        return sorted;
    };

    function toggleEditMode(index) {
        const _editModes = [...editModes];
        if (_editModes[index] === undefined || _editModes[index] === false) {
            _editModes[index] = true;
        } else if (_editModes[index] === true) {
            _editModes[index] = false;
        }
        return _editModes;
    }

    return (
        <div className="comments">
                {sortedComments().map(comment => (
                    <div key={comment.id} className="comment-wrapper">
                        <Comment comment={comment} own={currentUser.username === comment.user.username} onVoteClick={onVoteClick} onDeleteClick={onDeleteClick} onUpdateClick={onUpdateClick} onAddReplyClick={() => setEditModes(toggleEditMode(comment.id))} />
                        {currentUser.username !== comment.user.username && editModes[comment.id]
                            && <CreateReply currentUser={currentUser} replyingTo={{ "id": comment.id, "username": comment.user.username }} onReplyClick={onReplyClick} hideMe={() => setEditModes(toggleEditMode(comment.id))} />}
                        {comment.replies.length > 0 ? <CommentReplies replies={comment.replies} currentUser={currentUser} onVoteClick={onVoteClick} onDeleteClick={onDeleteClick} onUpdateClick={onUpdateClick} onReplyClick={onReplyClick} /> : ''}
                    </div>
                ))}
        </div>
    )
};

export default Comments;