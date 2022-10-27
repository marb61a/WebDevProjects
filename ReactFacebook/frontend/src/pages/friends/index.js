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
                    </div>
                </div>
            </div>
        </>
    )
}