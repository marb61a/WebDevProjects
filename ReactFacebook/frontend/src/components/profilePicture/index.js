import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import "./style.css";
import UpdateProfilePicture from "./UpdateProfilePicture";
import useOnClickOutside from "../../helpers/clickOutside";
import { photosReducer } from "../../functions/reducers";

export default function ProfilePicture({ username, setShow, pRef, photos }){
    const popup = useRef(null);
    const { user } = useSelector((state) => ({ ...state }));
    const refInput = useRef(null);
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    const handleImage = (e) => {
        let file = e.target.files[0];
        if(
            file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/webp" && file.type !== "image/gif"
        ){
            setError(`${file.name} format is not supported.`);
            return;
        } else if(file.size > 1024 * 1024 * 5){
            setError(`${file.name} is too large max 5mb allowed.`);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            setImage(event.target.result);
        };
    };

    return(
        <div className="blur">
            <input
                type="file"
                ref={refInput}
                hidden
                onChange={handleImage}
                accept="image/jpeg,image/png,image/webp,image/gif"
            />
            <div className="postBox pictureBox" ref={popup}>
                <div className="box_header">
                    <div className="small_circle" onClick={() => setShow(false)}>
                        <i className="exit_icon"></i>
                    </div>
                    <span>Update Profile Picture</span>
                </div>
                
            </div>
        </div>
    );
}