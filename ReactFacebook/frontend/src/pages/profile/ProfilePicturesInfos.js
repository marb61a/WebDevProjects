import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import ProfilePicture from "../../components/profilePicture";
import Friendship from "./Friendship";

export default function ProfielPictureInfos({
    profile,
    visitor,
    photos,
    othername,
}){
    const [show, setShow] = useState(false);
    const pRef = useRef(null);

    return(
        <div className="profile_img_wrap">
            {show && <ProfilePicture setShow={setShow} pRef={pRef} photos={photos} />}
            <div className="profile_w_left">
                <div className="profile_w_img">
                    <div>
                        {!visitor && (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}