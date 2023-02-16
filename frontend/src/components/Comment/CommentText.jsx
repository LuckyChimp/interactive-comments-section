import { useState, useEffect } from "react";

import { fetchComment, fetchUser } from "../../api";


const CommentText = ({ text, replyingTo }) => {
    const [recipient, setRecipient] = useState(null);


    useEffect(() => {
        let active = true; // implement active bool to prevent race conditions

        fetchComment(replyingTo).then(commentData => {
            fetchUser(commentData.user).then(userData => {
                if (active) {
                    setRecipient(userData.username);
                }
            });
        });

        return () => {
            active = false;
        }
    }, [replyingTo]);


    return (
        <p className="comment-text">
            {
                recipient &&
                <span className="comment-text-recipient">@{recipient} </span>
            }
            {text}
        </p>
    );
}

export default CommentText;