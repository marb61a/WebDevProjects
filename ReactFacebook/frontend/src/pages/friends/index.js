import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import Header from "../../components/header";
import { friendspage } from "../../functions/reducers";
import { getFriendsPageInfos } from "../../functions/user";
import Card from "./Card";
import "./style.css";

export default function Friends(){
    const { user } = useSelector((state) => ({ ...state }));
    const { type } = useParams();

    const [{ loading, error, data }, dispatch] = useReducer(friendspage, {
        loading: false,
        data: {},
        error: "",
    });
    useEffect(() => {
        getData();
    }, []);

    const getData = async() => {
        dispatch({ type: "FRIENDS_REQUEST" });
        const data = await getFriendsPageInfos(user.token);

        if (data.status === "ok") {
            dispatch({ type: "FRIENDS_SUCCESS", payload: data.data });
        } else {
            dispatch({ type: "FRIENDS_ERROR", payload: data.data });
        }
    };

    return(
        <>
            <Header page="friends"/>
            <div className="friends">
                <div className="friends_left">
                    <div className="friends_left_header">
                        <h3>Friends</h3>
                        <div className="small_circle">
                            <i className="settings_filled_icon"></i>
                        </div>
                    </div>
                    <div className="friends_left_wrap">
                        <Link
                            to="/friends"
                            className={`mmenu_item hover3 ${
                                type === undefined && "active_friends"
                            }`}
                        >
                            <div className="small_circle">
                                <i className="friends_home_icon "></i>
                            </div>
                            <span>Home</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        <Link
                            to="/friends/requests"
                            className={`mmenu_item hover3 ${
                                type === "requests" && "active_friends"
                            }`}
                        >
                            <div className="small_circle">
                                <i className="friends_requests_icons"></i>
                            </div>
                            <span>Friend Requests</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        <Link
                            to="/friends/sent"
                            className={`mmenu_item hover3 ${
                                type === "sent" && "active_friends"
                            }`}
                        >
                            <div className="small_circle">
                                <i className="friends_requests_icons"></i>
                            </div>
                            <span>Sent Requests</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        <div className="mmenu_item hover3">
                            <div className="small_circle">
                                <i className="friends_suggestions_icon"></i>
                            </div>
                            <span>Suggestions</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </div>
                        <Link
                            to="/friends/all"
                            className={`mmenu_item hover3 ${
                              type === "all" && "active_friends"
                            }`}
                        >
                            <div className="small_circle">
                                <i className="all_friends_icon"></i>
                            </div>
                            <span>All Friends</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        <div className="mmenu_item hover3">
                            <div className="small_circle">
                                <i className="birthdays_icon"></i>
                            </div>
                            <span>Birthdays</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </div>
                        <div className="mmenu_item hover3">
                            <div className="small_circle">
                                <i className="all_friends_icon"></i>
                            </div>
                            <span>Custom Lists</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}