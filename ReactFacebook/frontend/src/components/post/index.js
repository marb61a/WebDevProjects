import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useState } from "react";

import "./style.css";
import{ Dots, Public} from "../../svg";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
import ReactsPopup from "./ReactsPopup";
import { postsReducer } from "../../functions/reducers";

export default function Post({ post, user, profile }){
    const [visible, setVisible] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    return(
        <div className="post">
            <div className="post_header">
                <Link
                    to={`/profile/${post.user.username}`}
                    className="post_header_left"
                >
                    <img src={post.user.picture} alt=""/>
                    <div className="header_col">
                        <div className="post_profile_name">
                            {post.user.first_name} {post.user.last_name}
                            <div className="updated_p">
                                {post.type == "profilePicture" && `
                                    updated ${post.user.gender === "male" ? "his" : "her"} profile picture
                                `}
                                {post.type == "cover picture" && `
                                    updated ${post.user.gender === "male" ? "his" : "her"} cover picture
                                `}
                            </div>
                        </div>
                        <div className="post_profile_privacy_date">
                            <Moment fromNow interval={30}>
                                {post.createdAt}
                            </Moment>
                            . <Public color="#828387" />
                        </div>
                    </div>
                </Link>
                <div
                    className="post_header_right hover1"
                    onClick={() => setShowMenu((prev) => !prev)}
                >
                    <Dots color="#828387" />
                </div>
                {post.background ? (
                    <div
                        className="post_bg"
                        style={{ backgroundImage: `url(${post.background})` }}
                    >
                        <div className="post_bg_text">{post.text}</div>
                    </div>
                ) : post.type === null ? (
                    <>
                        <div className="post_text">{post.text}</div>
                        {post.images && post.images.length (
                            <div
                                className={
                                    post.images.length === 1
                                    ? "grid_1"
                                    : post.images.length === 2
                                    ? "grid_2"
                                    : post.images.length === 3
                                    ? "grid_3"
                                    : post.images.length === 4
                                    ? "grid_4"
                                    : post.images.length >= 5 && "grid_5"
                                }
                            >

                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}