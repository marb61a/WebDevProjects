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

    return(
        <>
            <Header page="friends"/>
            <div className="friends">
                <div className="friends_left">

                </div>
            </div>
        </>
    )
}