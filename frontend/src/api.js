const fetchUser = async (userID) => {
    const res = await fetch(`http://www.localhost:5000/api/users/${userID}`);
    const user = await res.json();

    return user;
};

export { fetchUser };