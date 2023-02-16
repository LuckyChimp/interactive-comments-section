import { useState, useEffect } from "react";

import { fetchReplies } from "../api";

import Comment from "./Comment/Comment";
import CreateReply from "./CreateReply";

const CommentReplies = ({ replyIDs, onDeleteClick }) => {
    const [repliesData, setRepliesData] = useState([]);

    useEffect(() => {
        let active = true; // implement active bool to prevent race conditions

        fetchReplies(replyIDs).then(repliesData => {
            if (active) {
                setRepliesData(repliesData);
            }
        });

        return () => {
            active = false;
        }
    }, [replyIDs]);


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
                    <ReplyWrapper
                        replyData={replyData}
                        onDeleteClick={(commentID) => onDeleteClick(commentID)}
                        key={replyData._id}
                    />
                )}
            </div>
        </div>
    )
}

const ReplyWrapper = ({ replyData, onDeleteClick }) => {
    const [replyMode, setReplyMode] = useState(false);


    return (
        <div className="comment-wrapper">
            <Comment
                commentData={replyData}
                onReplyClick={() => setReplyMode(!replyMode)}
                onDeleteClick={(commentID) => onDeleteClick(commentID)}
            />
            {
                replyMode &&
                <CreateReply
                    replyingTo={replyData._id}
                    hideMe={() => setReplyMode(false)}
                />
            }
        </div>
    );

};

export default CommentReplies;