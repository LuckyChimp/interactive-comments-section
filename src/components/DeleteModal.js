const DeleteModal = ({ onCancelClick, onDeleteClick }) => {
  return (
    <div id="delete-modal">
        <div className="delete-modal-popup">
            <h1>Delete comment</h1>
            <p>Are you sure you want to delete this comment?<br />This will remove the comment and can't be undone.</p>
            <div className="delete-modal-popup-actions">
                <button onClick={onCancelClick} className="delete-modal-popup-actions-button delete-modal-action-cancel">No, cancel</button>
                <button onClick={onDeleteClick} className="delete-modal-popup-actions-button delete-modal-action-delete">Yes, delete</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal