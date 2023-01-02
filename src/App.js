import { useState, useEffect } from 'react';
import Comments from './components/Comments';
import CreateComment from './components/CreateComment';
import DeleteModal from './components/DeleteModal';

function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [comments, setComments] = useState(null);

	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [deleteCommentID, setDeleteCommentID] = useState(null);

	const DB_URL = 'https://comments-db-beta.vercel.app/';

	useEffect(() => {
		const getCurrentUser = async () => {
			const currentUserFromServer = await fetchCurrentUser();
			setCurrentUser(currentUserFromServer);
		};

		const getComments = async () => {
			const commentsFromServer = await fetchComments();
			setComments(commentsFromServer);
		};

		getCurrentUser();
		getComments();
	}, []);

	// Handles click outside of modal popup and closes delete modal
	window.onclick = (event) => {
		if (event.target === document.getElementById('delete-modal')) {
			hideDeleteModal();
		}
	};

	// Handles escape key press and closes delete modal
	window.onkeydown = (event) => {
		if (event.code === 'Escape' && deleteModalVisible) {
			hideDeleteModal();
		}
	};

	// Fetch current user
	const fetchCurrentUser = async () => {
		const res = await fetch(`/* ${DB_URL} *//currentUser`);
		const data = await res.json();

		return data;
	};

	// Fetch comments
	const fetchComments = async () => {
		const res = await fetch(`${DB_URL}/comments`);
		const data = await res.json();

		return data;
	};

	// Get comment or reply by id
	const getCommentByID = async (id) => {
		const _comments = await fetchComments();
		let returnedComment;

		for (let i = 0; i < _comments.length; i++) {
			const comment = comments[i];
			if (comment.id === id) {
				returnedComment = comment;
			} else {
				const replies = comment.replies;
				for (let j = 0; j < replies.length; j++) {
					const reply = replies[j];
					if (reply.id === id) {
						returnedComment = reply;
					}
				}
			}
		}
		return returnedComment;
	};

	// returns comment itself if it isn't a reply
	const getParentWithComment = async (comment) => {
		const cs = await fetchComments();
		let parent;

		for (let i = 0; i < cs.length; i++) {
			let c = cs[i];
			if (c.id === comment.id) {
				parent = comment;
			} else {
				let rs = c.replies;
				for (let j = 0; j < rs.length; j++) {
					if (rs[j].id === comment.id) {
						c.replies[j] = comment;
						parent = c;
					}
				}
			}
		}
		return parent;
	};

	const isReply = (comment) => {
		return comment.hasOwnProperty('replyingTo');
	};

	// Upvote or downvote comment
	const updateScore = async (id, change) => {
		const comment = await getCommentByID(id);
		const updCommentOrReply = { ...comment, score: comment.score + change };
		const updComment = await getParentWithComment(updCommentOrReply);

		const res = await fetch(`${DB_URL}/comments/${updComment.id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(updComment)
		});
		const data = await res.json();

		setComments(comments.map((comment) => (comment.id === data.id ? data : comment)));
	};

	// Delete comment
	const deleteComment = async () => {
		let comment = await getCommentByID(deleteCommentID);
		if (isReply(comment)) {
			let parentComment = await getParentWithComment(comment);
			parentComment.replies.splice(
				parentComment.replies.findIndex((reply) => reply === comment),
				1
			);

			await fetch(`${DB_URL}/comments/${parentComment.id}`, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(parentComment)
			});

			setComments(comments.map((comment) => (comment.id === parentComment.id ? parentComment : comment)));
		} else {
			await fetch(`${DB_URL}/comments/${deleteCommentID}`, {
				method: 'DELETE'
			});

			setComments(comments.filter((comment) => comment.id !== deleteCommentID));
		}
	};

	function showDeleteModal() {
		setDeleteModalVisible(true);
		document.body.classList.toggle('unscrollable');
	}

	function hideDeleteModal() {
		setDeleteModalVisible(false);
		document.body.classList.toggle('unscrollable');
	}

	async function getLastID() {
		const _comments = await fetchComments();
		let lastID = 0;

		for (let i = 0; i < _comments.length; i++) {
			const comment = comments[i];
			if (comment.id > lastID) {
				lastID = comment.id;
			}
			const replies = comment.replies;
			for (let j = 0; j < replies.length; j++) {
				const reply = replies[j];
				if (reply.id > lastID) {
					lastID = reply.id;
				}
			}
		}
		return lastID;
	}

	const createComment = async (text) => {
		const comment = {
			id: (await getLastID()) + 1,
			content: text,
			createdAt: Date.now() - 1000,
			score: 0,
			user: {
				image: {
					png: currentUser.image.png,
					webp: currentUser.image.webp
				},
				username: currentUser.username
			},
			replies: []
		};

		const res = await fetch(`${DB_URL}/comments`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(comment)
		});
		const data = await res.json();

		setComments([...comments, data]);
	};

	const updateCommentText = async (id, txt) => {
		let splittedTxt = txt.trim().split(' ');
		const replyingTo = splittedTxt[0].charAt(0) === '@' ? splittedTxt[0].replace('@', '') : '';
		replyingTo && splittedTxt.shift(); // remove @username in splittedTxt for textContent
		const textContent = splittedTxt.join(' ');

		const comment = await getCommentByID(id);
		const updCommentOrReply = isReply(comment)
			? { ...(await getCommentByID(id)), content: textContent, replyingTo: replyingTo }
			: { ...(await getCommentByID(id)), content: textContent };
		const updComment = await getParentWithComment(updCommentOrReply);

		const res = await fetch(`${DB_URL}/comments/${updComment.id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(updComment)
		});
		const data = await res.json();

		setComments(comments.map((comment) => (comment.id === data.id ? data : comment)));
	};

	const createReply = async (replyingTo, text) => {
		const reply = {
			id: (await getLastID()) + 1,
			content: text,
			createdAt: Date.now() - 1000,
			score: 0,
			replyingTo: replyingTo.username,
			user: {
				image: {
					png: currentUser.image.png,
					webp: currentUser.image.webp
				},
				username: currentUser.username
			}
		};
		const commentOrReply = await getCommentByID(replyingTo.id);
		let comment = isReply(commentOrReply) ? await getParentWithComment(commentOrReply) : commentOrReply;
		comment.replies = [...comment.replies, reply];

		const res = await fetch(`${DB_URL}/comments/${comment.id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(comment)
		});
		const data = await res.json();

		setComments(comments.map((comment) => (comment.id === data.id ? data : comment)));
	};

	return (
		<>
			<main>
				{comments && (
					<Comments
						comments={comments}
						currentUser={currentUser}
						onVoteClick={updateScore}
						onDeleteClick={(id) => {
							showDeleteModal();
							setDeleteCommentID(id);
						}}
						onUpdateClick={updateCommentText}
						onReplyClick={createReply}
					/>
				)}
				{currentUser && (
					<CreateComment
						currentUser={currentUser}
						onCommentSendClick={createComment}
					/>
				)}
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
						deleteComment();
						hideDeleteModal();
					}}
				/>
			)}
		</>
	);
}

export default App;
