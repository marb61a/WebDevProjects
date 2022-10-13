import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

import { profileReducer } from "../../functions/reducers";
import Header from "../../components/header";
import "./style.css";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfielPictureInfos";
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

    const [{ loading, error, profile }] = useReducer(profileReducer, {
        loading: false,
        profile: {},
        error: ""
    });
    useEffect(() => {
        getProfile();
    }, [userName]);
    useEffect(() => {
        setOthername(profile?.details?.otherName);
    }, [profile]);

    var visitor = userName === user.username ? false : true;
    const [othername, setOthername] = useState();
    const path = `${userName}/*`;
    const max = 30;
    const sort = "desc";

    const getProfile = async() => {
        try{
            dispatchEvent({type: "PROFILE_REQUEST"});
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`, {headers:{Authorization: `Bearer ${user.token}`}});

            if(data.ok === false){
                navigate("/profile");
            }
        } catch(error){

        }
    };

    return(
        <div className="profile">
            <Header />
            <div className="profile_top" ref={profileTop}>
                <div className="profile_container">
                    <Cover 
                        cover={profile.cover}
                        visitor={visitor}
                        photos={photos.resources}
                    />
                    <ProfilePictureInfos 
                        profile={profile}
                        visitor={visitor}
                        photos={photos.resources}
                        othername={othername}
                    />
                    <ProfileMenu />
                </div>
            </div>
            <div className="profile_bottom">
                <div className="profile_container">
                    <div className="bottom_container">
                        <PplYouMayKnow />
                        <div
                            className={`profile_grid ${
                                check && scrollHeaight >= height && leftHeight > 1000
                                ? "scrollFixed showLess" : check && scrollHeight >= height && leftHeight < 1000 && "scrollFixed showMore"
                            }`}
                        >
                            <div className="profile_left" ref={leftSide}>
                                <Intro 
                                    detailss={profile.details}
                                    visitor={visitor}
                                    setOthername={setOthername}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}