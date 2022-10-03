import axios from "axios";
import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import Cookies from "js-cookie";

import { createPost } from "../../functions/post";
import { uploadImages } from "../../functions/uploadImages";
import { updateprofilePicture } from "../../functions/user";
import getCroppedImg from "../../helpers/getCroppedImg";

export default function UpdateProfilePicture({
    setImage,
    image,
    setError,
    setShow,
    pRef,
}){
    const dispatch = useDispatch();
    const [description, setDescription] = useState("");
    const [crop, setCrop] = useState({ x: 0, y: 0 });

    const updateProfilePicture = async() => {
        try{
            setLoading(true);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };

    return(
        <div className="postBox update_img">
            <div>

            </div>
        </div>
    );
}