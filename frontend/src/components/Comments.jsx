import Comment from "./Comment";
import CreateReply from "./CreateReply";
import CommentReplies from "./CommentReplies";

const Comments = ({ }) => {

    const comments = [];

    return (
        <div className="comments">
            {comments.map(comment => (
                <div
                    key={comment.id}
                    className="comment-wrapper">
                    <Comment
                        comment={comment}
                    />
                    <CreateReply />
                    {comment.replies.length > 0
                        ? <CommentReplies
                            replies={comment.replies}
                        />
                        : ''
                    }
                </div>
            ))}
        </div>
    )
};

export default Comments;