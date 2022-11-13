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

    const addFriendHandler = async() => {
        setFriendship({
            ...friendship, requestSent: true, following: true
        });
        await addFriend(profileid, user.token);
    };
    const cancelRequestHandler = async() => {
        setFriendship({
            ...friendship, requestSent: false, following: false
        });
        await cancelRequest(profileid, user.token);
    };
    const followHandler = async() => {
        setFriendship({
            ...friendship, following: true
        });
        await follow(profileid, user.token);
    };
    const unfollowHandler = async() => {
        setFriendship({
            ...friendship, following: false
        });
        await unfollow(profileid, user.token);
    };
    const acceptRequestHandler = async() => {
        setFriendship({
            ...friendship, friends: true, following: true, requestSent: false, requestReceived: false
        });
        await acceptRequest(profileid, user.token);
    };
    const unfriendHandler = async() => {
        setFriendship({
            ...friendship, friends: false, following: false, requestSent: false, requestReceived: false
        });
        await unfriend(profileid, user.token);
    };
    const deleteRequestHandler = async() => {
        setFriendship({
            ...friendship, friends: false, following: false, requestSent: false, requestReceived: false
        });
        await deleteRequest(profileid, user.token);
    }

    return(
        <div className="friendship">
            {friendship?.friends?(
                <div className="friends_menu_wrap">
                    <button className="gray_btn">
                        <span>Friends</span>
                    </button>
                    {friendsMenu && (
                        <div className="open_cover_menu" ref={menu}>
                            <div className="open_cover_menu_item hover1">
                                <img src="../../../icons/favoritesOutline.png" alt="" />
                                Favorites
                            </div>
                            <div className="open_cover_menu_item hover1">
                                <img src="../../../icons/editFriends.png" alt="" />
                                Edit Friend list
                            </div>
                            {friendShip?.following? (
                                <div
                                    className="open_cover_menu_item hover1"
                                    onClick={() => unfollowHandler()}
                                >
                                    <img src="../../../icons/unfollowOutlined.png" alt="" />
                                    Unfollow
                                </div>
                            ) : (
                                <div
                                    className="open_cover_menu_item hover1"
                                    onClick={() => followHandler()}
                                >
                                    <img src="../../../icons/unfollowOutlined.png" alt="" />
                                    Follow
                                </div>
                            )}
                            <div
                                className="open_cover_menu_item hover1"
                                onClick={() => unfriendHandler()}
                            >
                                <i className="unfriend_outlined_icon"></i>
                                Unfriend
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                !friendship?.requestSent && !friendship?.requestReceived && (
                    <button className="blue_btn" onClick={() => addFriendHandler()}>
                        <img src="../../../icons/addFriend.png" alt="" className="invert"/>
                        <span>Add Friend</span>
                    </button>
                )
            )}
            {frienship?.requestSent ? (
                
            )}
        </div>
    );
}