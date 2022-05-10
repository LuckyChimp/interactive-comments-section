import Comment from "./Comment";
import CreateReply from "./CreateReply";
import { useState } from "react";

const CommentReplies = ({ replies, currentUser, onVoteClick, onDeleteClick, onUpdateClick, onReplyClick }) => {
    const [editModes, setEditModes] = useState(new Array(replies.length).fill(undefined));

    const sortedReplies = () => {
        const sortedReplies = replies.sort((a, b) => a.createdAt - b.createdAt);
        return sortedReplies;
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
        <div className="comment-replies">
            <div className="vertical-indentation-line"></div>
            <div className="comment-replies-wrapper">
                {sortedReplies().map(reply =>
                    <div
                        key={reply.id}
                        className="comment-wrapper">
                        <Comment
                            comment={reply}
                            own={currentUser.username === reply.user.username}
                            replyingTo={reply.replyingTo}
                            onVoteClick={onVoteClick}
                            onDeleteClick={onDeleteClick}
                            onUpdateClick={onUpdateClick}
                            onAddReplyClick={() => setEditModes(toggleEditMode(reply.id))}
                        />
                        {(currentUser.username !== reply.user.username && editModes[reply.id]) &&
                            <CreateReply
                                currentUser={currentUser}
                                replyingTo={{ "id": reply.id, "username": reply.user.username }}
                                onReplyClick={onReplyClick}
                                hideMe={() => setEditModes(toggleEditMode(reply.id))}
                            />
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentReplies;