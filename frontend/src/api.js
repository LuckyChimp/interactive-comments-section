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

export { fetchUser, fetchComments, fetchComment };