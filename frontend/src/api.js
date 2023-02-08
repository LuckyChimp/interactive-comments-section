const fetchUser = async (userID) => {
    const res = await fetch(`${process.env.REACT_APP_DB_URL}/users/${userID}`);
    const user = await res.json();

    return user;
};

const fetchComments = async () => {
    const res = await fetch(`${process.env.REACT_APP_DB_URL}/comments`);
    const comments = await res.json();
    
    return comments;
}

const fetchComment = async (commentID) => {
    const res = await fetch(`${process.env.REACT_APP_DB_URL}/comments/${commentID}`);
    const comment = await res.json();
    
    return comment;
}

export { fetchUser, fetchComments, fetchComment };