import Comment from "./Comment";
import CreateReply from "./CreateReply";

const CommentReplies = ({ replies }) => {

    const sortedReplies = () => {
        if (!replies) {
            return [];
        }

        const sortedReplies = replies.sort((a, b) => a.createdAt - b.createdAt);
        return sortedReplies;
    };

    return (
        <div className="comment-replies">
            <div className="vertical-indentation-line"></div>
            <div className="comment-replies-wrapper">
                {sortedReplies().map(reply =>
                    <div
                        key={reply._id}
                        className="comment-wrapper">
                        <Comment
                            comment={reply}
                        />
                        <CreateReply
                            replyingTo={{ "id": reply.id, "username": reply.user.username }}
                            onReplyClick={() => { }}
                            hideMe={() => { }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentReplies;