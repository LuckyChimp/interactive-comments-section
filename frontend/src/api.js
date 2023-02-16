const fetchUser = async (userID) => {
	try {
		const res = await fetch(`${process.env.REACT_APP_DB_URL}/users/${userID}`);
		if (!res.ok) {
			const err = await res.json();
			console.error(err.stack);
			return;
		}

		const user = await res.json();

		return user;
	} catch (error) {
		console.error(error);
	}
};

const fetchComments = async () => {
	try {
		const res = await fetch(`${process.env.REACT_APP_DB_URL}/comments`);
		const comments = await res.json();

		return comments;
	} catch (error) {
		console.error(error);
	}
};

const fetchComment = async (commentID) => {
	try {
		const res = await fetch(`${process.env.REACT_APP_DB_URL}/comments/${commentID}`);
		if (!res.ok) {
			const err = await res.json();
			console.error(err.stack);
			return;
		}

		const comment = await res.json();

		return comment;
	} catch (error) {
		console.error(error);
	}
};

// in the DB comment.replies only stores the ids as a reference to the relative comments - this function accepts these ids, fetches the relative comments and returns them
const fetchReplies = async (replyIDs) => {
	const replies = [];

	for (const replyID of replyIDs) {
		const reply = await fetchComment(replyID);
		if (reply) {
			replies.push(reply);
		}
	}

	return replies;
};

const createComment = async (text, userID, score, replies) => {
	try {
		const bodyData = {
			content: text,
			user: userID,
			score: score ? score : 0,
			replies: replies ? replies : []
		};
		const res = await fetch(`${process.env.REACT_APP_DB_URL}/comments`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(bodyData)
		});
		if (!res.ok) {
			const err = await res.json();
			console.error(err.stack);
			return;
		}

		const createdComment = await res.json();

		return createdComment;
	} catch (error) {
		console.log(error);
	}
};

const createReply = async (text, userID, replyingTo, score) => {
	try {
		const bodyData = {
			content: text,
			user: userID,
			replyingTo: replyingTo,
			score: score ? score : 0
		};
		const res = await fetch(`${process.env.REACT_APP_DB_URL}/comments`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(bodyData)
		});
		if (!res.ok) {
			const err = await res.json();
			console.error(err.stack);
			return;
		}

		const createdReply = await res.json();

		return createdReply;
	} catch (error) {
		console.log(error);
	}
};

const updateText = async (commentID, text) => {
	try {
		const res = await fetch(`${process.env.REACT_APP_DB_URL}/comments/${commentID}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ content: text })
		});
		if (!res.ok) {
			const err = await res.json();
			console.error(err.stack);
			return;
		}

		const updatedComment = await res.json();

		return updatedComment;
	} catch (error) {
		console.error(error);
	}
};

const updateScore = async (commentID, score) => {
	try {
		const res = await fetch(`${process.env.REACT_APP_DB_URL}/comments/${commentID}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ score: score })
		});
		if (!res.ok) {
			const err = await res.json();
			console.error(err.stack);
			return;
		}

		const updatedComment = await res.json();

		return updatedComment;
	} catch (error) {
		console.error(error);
	}
};

const deleteComment = async (commentID) => {
	try {
		const res = await fetch(`${process.env.REACT_APP_DB_URL}/comments/${commentID}`, {
			method: 'DELETE'
		});
		if (!res.ok) {
			const err = await res.json();
			console.error(err.stack);
			return;
		}

		const deletedCommentID = await res.json();

		return deletedCommentID;
	} catch (error) {
		console.error(error);
	}
};

export {
	fetchUser,
	fetchComments,
	fetchComment,
	fetchReplies,
	createComment,
	createReply,
	updateText,
	updateScore,
	deleteComment
};
