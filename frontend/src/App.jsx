import { useState, useEffect, createContext } from 'react';

import { fetchComments, deleteComment } from "./api";
import Comments from './components/Comments';
import CreateComment from './components/CreateComment';
import DeleteModal from './components/DeleteModal';
import './App.scss';

export const CommentsDataContext = createContext();


function App() {
	const [commentsData, setCommentsData] = useState([]);

	const [deleteCommentID, setDeleteCommentID] = useState(null);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);


	useEffect(() => {
		let active = true; // implement active bool to prevent race conditions

		fetchComments().then(commentsData => {
			if (active) {
				setCommentsData(commentsData);
			}
		});

		// functions for 'window' events
		// onDeleteModalOutsideClick handles click outside of modal popup and closes delete modal
		const onDeleteModalOutsideClick = (event) => {
			if (event.target === document.getElementById('delete-modal')) {
				hideDeleteModal();
			}
		};

		// onEscKeyPress handles escape key press and closes delete modal
		const onEscKeyPress = (event) => {
			if (event.code === 'Escape' && deleteModalVisible) {
				hideDeleteModal();
			}
		};

		// register window events
		window.addEventListener('click', onDeleteModalOutsideClick);
		window.addEventListener('keydown', onEscKeyPress);

		return () => {
			active = false;
			// unregister window events
			window.removeEventListener('click', onDeleteModalOutsideClick);
			window.removeEventListener('keydown', onEscKeyPress);
		};
	}, [deleteModalVisible]);


	function showDeleteModal() {
		setDeleteModalVisible(true);
		document.body.classList.toggle('unscrollable');
	}

	function hideDeleteModal() {
		setDeleteModalVisible(false);
		document.body.classList.toggle('unscrollable');
	}

	return (
		<CommentsDataContext.Provider value={{ commentsData, setCommentsData }}>
			<main>
				<Comments
					onDeleteClick={(commentID) => {
						setDeleteCommentID(commentID);
						showDeleteModal();
					}} />
				<CreateComment />
			</main>
			<footer>
				<div className='attribution'>
					Challenge by{' '}
					<a
						href='https://www.frontendmentor.io?ref=challenge'
						target='_blank'
						rel='noreferrer'
					>
						Frontend Mentor
					</a>
					. Coded by <a href='https://github.com/LuckyChimp'>LuckyChimp</a>.
				</div>
			</footer>

			{deleteModalVisible && (
				<DeleteModal
					onCancelClick={hideDeleteModal}
					onDeleteClick={() => {
						deleteComment(deleteCommentID).then(({ id }) => {
							fetchComments().then(commentsData => {
								setCommentsData(commentsData);
								hideDeleteModal();
							});
						});
					}}
				/>
			)}
		</CommentsDataContext.Provider>
	);
}

export default App;

// TODO implement boolean flag in all useEffect hooks to prevent race conditions