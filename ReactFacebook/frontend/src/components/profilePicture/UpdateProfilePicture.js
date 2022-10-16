import axios from "axios";
import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import Cookies from "js-cookie";

import { createPost } from "../../functions/post";
import { uploadImages } from "../../functions/uploadImages";
import { updateProfilePicture } from "../../functions/user";
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
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const slider = useRef(null);
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);

    const getCroppedImage = useCallback(
        async(show) => {
           try{
                const img = await getCroppedImg(image, croppedAreaPixels);
                if(show){
                    setZoom(1);
                    setCrop({ x: 0, y: 0 });
                    setImage(img)
                } else {
                    return img;
                }
           } catch(error){
            console.log(error);
           }
        }
    )

    const updateProfilePicture = async() => {
        try{
            setLoading(true);
            let img = await getCroppedImage();
            let blob = await fetch(img).then((b) => b.blob());
            const path = `${user.username}/profile_pictures`;
            
            let formData = new FormData();
            formData.append("file", blob);
            formData.append("path", path);
            const res = await uploadImages(formData, path, user.token);

            const updated_picture = await updateProfilePicture(
                res[0].url,
                user.token
            );
            if(updated_picture === "ok"){
                const newPost = await createPost("profilePicture", null, description, res, user.id, user.token);        

                if(newPost === "ok"){
                    setLoading(false);
                    setImage("");
                    pRef.current.style.backgroundImage = `url(${res[0].url})`;
                    Cookies.set(
                        "user",
                        JSON.stringify({
                          ...user,
                          picture: res[0].url,
                        })
                    );
                    dispatch({
                        type: "UPDATEPICTURE",
                        payload: res[0].url,
                    });
                    setShow(false);
                } else {
                    setLoading(false);
                    setError(newPost);
                }
            } else {
                setLoading(false);
                setError(updated_picture);
            }
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };

    return(
        <div className="postBox update_img">
            <div className="box_header">
                <div className="small_circle" onClick={() => setImage("")}>
                    <i className="exit_icon"></i>
                </div>
                <span>Update Profile Picture</span>
            </div>
            <div className="update_image_desc">
                <textarea
                
                ></textarea>
            </div>
        </div>
    );
}