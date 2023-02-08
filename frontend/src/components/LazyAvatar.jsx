import { useState, useEffect } from "react";
import { fetchUser } from "../api";

const LazyAvatar = ({ userID, ...props }) => {
    const [avatar, setAvatar] = useState(null);
    const [avatarIsLoading, setAvatarIsLoading] = useState(false);

    useEffect(() => {
        let active = true; // implement active bool to prevent race conditions

        const fetchAvatarPath = async () => {
            setAvatarIsLoading(true);
            const user = await fetchUser(userID);
            const avatarPath = user.image.png;

            return avatarPath;
        }

        fetchAvatarPath().then((avatarPath) => {
            if (active) {
                setAvatar(require(`../${avatarPath}`));
                setAvatarIsLoading(false);
            }
        });

        return () => {
            active = false;
        };
    }, [userID]);

    return (
        <div>
            {avatarIsLoading && <LoadingSpinner />}
            <img src={avatar} {...props} style={{ display: avatarIsLoading ? 'none' : 'initial' }} />
        </div>
    );
}

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
        </div>
    );
}

export default LazyAvatar;