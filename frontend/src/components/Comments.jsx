import { useState, useEffect } from "react";

import { fetchComments, fetchReplies } from "../api";
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
                            replies={fetchReplies(comment.replies)}
                        />
                        : ''
                    }
                </div>
            ))}
        </div>
    )
};

export default Comments;