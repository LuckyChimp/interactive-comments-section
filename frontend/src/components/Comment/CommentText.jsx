const CommentText = ({ text, replyingTo }) => {
    return (
        <p className="comment-text">
            {
                replyingTo &&
                <span className="comment-text-recipient">
                    @{replyingTo}
                </span>
            }
            {text}
        </p>
    );
}

export default CommentText;