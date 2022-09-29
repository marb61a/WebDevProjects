import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useState } from "react";

import{ Dots, Public} from "../../svg";

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

                    </div>
                </Link>
            </div>
        </div>
    );
}