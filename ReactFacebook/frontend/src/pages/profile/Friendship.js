import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import useClickOutside from "../../helpers/clickOutside";
import {
    acceptRequest,
    addFriend,
    cancelRequest,
    deleteRequest,
    follow,
    unfollow,
    unfriend,
} from "../../functions/user";

export default function Friendship({ friendShip, profileid}){
    const [friendship, setFriendship] = useState(friendshipp);
    useEffect(() => {
        setFriendship(friendShip);
    }, [friendShip]);
    const [friendsMenu, setFriendsMenu] = useState(false);
    const [respondMenu, setRespondMenu] = useState(false);
    const menu = useRef(null);
    const menu1 = useRef(null);
    useClickOutside(menu, () => setFriendsMenu(false));
    useClickOutside(menu1, () => setRespondMenu(false));
    const { user } = useSelector((state) => ({ ...state }));

    return(
        <div className="friendship">
            {friendship?.friends?(
                <div className="friends_menu_wrap">
                    <button className="gray_btn">
                        <span>Friends</span>
                    </button>
                </div>
            ) : (
            )}
        </div>
    );
}