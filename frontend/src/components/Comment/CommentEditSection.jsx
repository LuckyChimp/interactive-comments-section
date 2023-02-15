const CommentEditSection = ({ text, onTextareaChange, onUpdateClick }) => {
    return (
        <div className="comment-edit-section">
            <textarea
                value={text}
                onChange={event => onTextareaChange(event.target.value)}
                onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
                className="comment-input"
                rows="3"
                spellCheck={false}
                autoFocus
            />
            <button
                onClick={() => onUpdateClick()}
                className="comment-update comment-action-button">
                Update
            </button>
        </div>
    );
}

export default CommentEditSection;