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

const updateCommentText = async (commentID, text) => {
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

		const data = await res.json();

		return data;
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

		const data = await res.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};

export { fetchUser, fetchComments, fetchReplies, updateCommentText, deleteComment };
