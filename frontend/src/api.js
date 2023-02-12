const fetchUser = async (userID) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_DB_URL}/users/${userID}`);
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
}

const fetchComment = async (commentID) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_DB_URL}/comments/${commentID}`);
        const comment = await res.json();
        
        return comment;
    } catch (error) {
        console.error(error);
    }
}

// in the DB comment.replies only stores the ids as a reference to the relative comments - this function accepts these ids, fetches the relative comments and returns them
const fetchReplies = async (replyIDs) => {
    const replies = [];

    for (const replyID of replyIDs) {
        const reply = await fetchComment(replyID);
        replies.push(reply);
    };

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
        const data = await res.json();
        
        return data;
    } catch (error) {
        console.error(error);
    }
};

export { fetchUser, fetchComments, fetchReplies, updateCommentText };