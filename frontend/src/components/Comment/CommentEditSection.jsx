import { useState, useEffect } from "react";

const CommentEditSection = ({ text, onUpdateClick }) => {
    const [newText, setNewText] = useState('');

    useEffect(() => {
        setNewText(text);
    }, []);


    return (
        <div className="comment-edit-section">
            <textarea
                value={newText}
                onChange={event => setNewText(event.target.value)}
                onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
                className="comment-input"
                rows="3"
                spellCheck={false}
                autoFocus
            />
            <button
                onClick={() => onUpdateClick(newText)}
                className="comment-update comment-action-button">
                Update
            </button>
        </div>
    );
}

export default CommentEditSection;