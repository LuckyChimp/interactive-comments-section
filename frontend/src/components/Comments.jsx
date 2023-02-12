import { useState, useEffect } from "react";

import { fetchComments, fetchReplies } from "../api";
import Comment from "./Comment/Comment";
import CreateReply from "./CreateReply";
import CommentReplies from "./CommentReplies";

const Comments = ({ }) => {
    const [commentsData, setCommentsData] = useState(null);

    useEffect(() => {
        let active = true; // implement active bool to prevent race conditions

        fetchComments().then((comments) => {
            if (active) {
                setCommentsData(comments);
            }
        });


        return () => {
            active = false;
        }
    }, []);


    return (
        <div className="comments">
            {commentsData && commentsData.map(commentData => (
                <div
                    key={commentData._id}
                    className="comment-wrapper">
                    <Comment
                        commentData={commentData}
                    />
                    <CreateReply />
                    {commentData.replies.length > 0
                        ? <CommentReplies
                            repliesData={fetchReplies(commentData.replies)}
                        />
                        : ''
                    }
                </div>
            ))}
        </div>
    )
};

export default Comments;