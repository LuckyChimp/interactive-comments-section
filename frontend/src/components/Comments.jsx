import { useState, useEffect } from "react";

import { fetchComments } from "../api";

import Comment from "./Comment/Comment";
import CreateReply from "./CreateReply";
import CommentReplies from "./CommentReplies";

const Comments = () => {
    const [commentsData, setCommentsData] = useState(null);

    useEffect(() => {
        let active = true; // implement active bool to prevent race conditions

        fetchComments().then(comments => {
            if (active) {
                setCommentsData(comments);
            }
        });


        return () => {
            active = false;
        }
    }, []);

    const sort = (a, b) => {
        if (a.score > b.score) {
            return -1;
        }
        if (a.score < b.score) {
            return 1;
        }
        return 0;
    };

    const isReply = (commentData) => {
        return commentData.replyingTo ? true : false;
    };


    return (
        <div className="comments">
            {commentsData && commentsData.sort(sort).map(commentData => (
                <div
                    key={commentData._id}
                    className="comment-wrapper">
                    {!isReply(commentData) && <Comment commentData={commentData} />}
                    <CreateReply />
                    {commentData.replies.length > 0 &&
                        <CommentReplies replyIDs={commentData.replies} />
                    }
                </div>
            ))}
        </div>
    )
};

export default Comments;