import { useState, useEffect } from "react";

import { fetchComments, fetchComment } from "../api";
import Comment from "./Comment";
import CreateReply from "./CreateReply";
import CommentReplies from "./CommentReplies";

const Comments = ({ }) => {
    const [comments, setComments] = useState(null);

    useEffect(() => {
        let active = true; // implement active bool to prevent race conditions

        fetchComments().then((comments) => {
            if (active) {
                setComments(comments);
            }
        });


        return () => {
            active = false;
        }
    }, []);

    // in the DB comment.replies only stores the ids as a reference to the relative comments - this function accepts these ids, fetches the relative comments and returns them
    const fetchCommentReplies = (replyIDArray) => {
        const replies = [];
        replyIDArray.forEach(async (replyID) => {
            const comment = await fetchComment(replyID);
            replies.push(comment);
        });

        return replies;
    };


    return (
        <div className="comments">
            {comments && comments.map(comment => (
                <div
                    key={comment._id}
                    className="comment-wrapper">
                    <Comment
                        comment={comment}
                    />
                    <CreateReply />
                    {comment.replies.length > 0
                        ? <CommentReplies
                            replies={fetchCommentReplies(comment.replies)}
                        />
                        : ''
                    }
                </div>
            ))}
        </div>
    )
};

export default Comments;