import DayJs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

import LazyAvatar from "../LazyAvatar";
import { ReactComponent as ReplyIcon } from "../../assets/images/icon-reply.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/icon-delete.svg";
import { ReactComponent as EditIcon } from "../../assets/images/icon-edit.svg";

const CommentHeader = ({ userID, createdAt, own, onEditClick }) => {
    // implement dayjs to calculate the elapsed time since the comment was created in seconds, minutes, hours, days, weeks, months or years
    DayJs().format();
    DayJs.extend(RelativeTime);

    return (
        <div className="comment-main-header">
            <HeaderInfo userID={userID} createdAt={createdAt} own={own} />
            <HeaderActions own={own} onEditClick={() => onEditClick()} />
        </div>
    );
}

const HeaderInfo = ({ userID, createdAt, own }) => {
    return (
        <div className="comment-main-header-info">
            <LazyAvatar userID={userID} width="2rem" height="2rem" className="comment-author-profile-photo" alt="author" />
            <span className="comment-author">{userID}</span>
            {own
                ? <span className="comment-owner-tag">you</span>
                : ''
            }
            <span className="comment-created">{DayJs(new Date(createdAt)).fromNow()}</span>
        </div>
    );
};

const HeaderActions = ({ own, onEditClick }) => {
    return (
        <div className="comment-main-header-actions">
            {!own
                ? <button
                    onClick={() => { }}
                    className="comment-main-header-reply comment-main-header-action">
                    <ReplyIcon className="comment-main-header-reply-icon comment-main-header-action-icon" />
                    Reply
                </button>
                : ''
            }
            {own
                ? <button
                    onClick={() => { }}
                    className="comment-main-header-delete comment-main-header-action">
                    <DeleteIcon className="comment-main-header-delete-icon comment-main-header-action-icon" />
                    Delete
                </button>
                : ''
            }
            {own
                ? <button
                    onClick={() => onEditClick()}
                    className="comment-main-header-edit comment-main-header-action">
                    <EditIcon className="comment-main-header-edit-icon comment-main-header-action-icon" />
                    Edit
                </button>
                : ''
            }
        </div>
    );
};

export default CommentHeader;