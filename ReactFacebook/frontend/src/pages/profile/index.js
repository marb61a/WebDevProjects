import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

import { profileReducer } from "../../functions/reducers";
import Header from "../../components/header";
import "./style.css";
import Cover from "./Cover";
import ProfielPictureInfos from "./ProfielPictureInfos";
import ProfileMenu from "./ProfileMenu";
import PplYouMayKnow from "./PplYouMayKnow";
import CreatePost from "../../components/createPost";
import GridPosts from "./GridPosts";
import Post from "../../components/post";
import Photos from "./Photos";
import Friends from "./Friends";
import Intro from "../../components/intro";

export default function Profile({ setVisible }){
    const { username } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const [photos, setPhotos] = useState({});
    var userName = username === undefined ? user.username : username;

    return(
        <div className="profile">
            <Header />
            <div className="profile_top" ref={profileTop}>
                <div className="profile_container">

                </div>
            </div>
        </div>
    );
}