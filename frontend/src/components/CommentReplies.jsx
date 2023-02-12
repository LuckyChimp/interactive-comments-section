import { useState, useEffect } from "react";

import { fetchReplies } from "../api";

import Comment from "./Comment/Comment";
import CreateReply from "./CreateReply";

const CommentReplies = ({ replyIDs }) => {
    const [repliesData, setRepliesData] = useState([]);

    useEffect(() => {
        let active = true;

        fetchReplies(replyIDs).then(replies => {
            if (active) {
                setRepliesData(replies);
            }
        });

        return () => {
            active = false;
        }
    }, [replyIDs])

    const sort = (a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        if (dateA < dateB) {
            return -1;
        }
        if (dateA > dateB) {
            return 1;
        }
        return 0;
    };


    return (
        <div className="comment-replies">
            <div className="vertical-indentation-line"></div>
            <div className="comment-replies-wrapper">
                {repliesData.sort(sort).map(replyData =>
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