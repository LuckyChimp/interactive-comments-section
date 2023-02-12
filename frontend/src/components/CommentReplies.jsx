import Comment from "./Comment/Comment";
import CreateReply from "./CreateReply";

const CommentReplies = ({ repliesData }) => {

    const sortedRepliesData = () => {
        if (!repliesData) {
            return [];
        }

        const sortedRepliesData = repliesData.sort((a, b) => a.createdAt - b.createdAt);
        return sortedRepliesData;
    };

    return (
        <div className="comment-replies">
            <div className="vertical-indentation-line"></div>
            <div className="comment-replies-wrapper">
                {sortedRepliesData().map(replyData =>
                    <div
                        key={replyData._id}
                        className="comment-wrapper">
                        <Comment
                            commentData={replyData}
                        />
                        <CreateReply
                            replyingTo={{ "id": replyData.id, "username": replyData.user.username }}
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