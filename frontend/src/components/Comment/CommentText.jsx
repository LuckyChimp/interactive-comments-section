import { useState, useEffect } from "react";

import { fetchUser } from "../../api";


const CommentText = ({ text, replyingTo }) => {
    const [recipient, setRecipient] = useState(null);


    useEffect(() => {
        // fetch and set username for displaying in comment header
        let active = true;

        fetchUser(replyingTo).then(user => {
            if (active) {
                setRecipient(user.username);
            }
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