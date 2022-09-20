import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutside from "../../helpers/clickOutside";
import { createPost } from "../../functions/post";


export default function CreatePostPopup({ user, setVisible }){
    const dispatch = useDispatch();
    const popup = useRef(null);
    const [text, setText] = useState("");
    const [showPrev, setShowPrev] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);
    const [background, setBackground] = useState("");

    useClickOutside(popup, () => {
        setVisible(false);
    });

    const postSubmit = async() => {
        if(background){
            setLoading(true);
            const response = await createPost(
                null, background, text, null, user.id, user.token
            );

            setLoading(false);
            if(response === "ok"){
                setBackground("");
                setText("");
                setVisible(false);
            } else {
                setError(response);
            }
        } else if(images && images.length){
            setLoading(true);
            const postImages = images.map((img) => {
                return dataURItoBlob(img);
            });
            const path = `${user.username}/ post Images`;
            let formData = new FormData();
            formData.append("path", path);
            postImages.forEach((image) => {
                formData.append("file", image);
            });
            const response = await uploadImages(formData, path, user.token);
            const res = await createPost(null, null, text, response, user.id, user.token);
            setLoading(false);

            if(res == "ok"){
                setText("");
                setImages("");
                setVisible(false);
            } else {
                setError(res);
            }
        } else if(text){
            setLoading(true);
            const response = await createPost(null, null, text, response, user.id, user.token);
            setLoading(false);

            if(response == "ok"){
                setText("");
                setImages("");
                setVisible(false);
            } else {
                setError(response);
            }
        } else {
            console.log("nothing");
        }
    }

    return(
        <div className="blur">
            <div className="postBox" ref={popup}>

            </div>
        </div>
    );
}