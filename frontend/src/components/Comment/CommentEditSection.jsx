import { useState, useEffect } from "react";

const CommentEditSection = ({ text, hideMe, onUpdateText }) => {
    const [newText, setNewText] = useState('');

    useEffect(() => {
        setNewText(text);
    }, [text]);


    const onKeyDown = (event) => {
        if (event.ctrlKey && event.key === 'Enter' && !event.repeat) {
            onUpdateText(newText);
        } else if (event.key == 'Escape' && !event.repeat) {
            hideMe();
        }
    };


    return (
        <div className="comment-edit-section">
            <textarea
                value={newText}
                onChange={event => setNewText(event.target.value)}
                onKeyDown={event => onKeyDown(event)}
                onFocus={event => event.target.setSelectionRange(event.target.value.length, event.target.value.length)}
                className="comment-input"
                rows="3"
                spellCheck={false}
                autoFocus
            />
            <button
                onClick={() => onUpdateText(newText)}
                className="comment-update comment-action-button">
                Update
            </button>
        </div>
    );
}

export default CommentEditSection;