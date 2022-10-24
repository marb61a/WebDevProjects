import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

import { updateCover } from "../../functions/user";
import { createPost } from "../../functions/post";
import { uploadImages } from "../../functions/uploadImages";
import useClickOutside from "../../helpers/clickOutside";
import getCroppedImg from "../../helpers/getCroppedImg";
import OldCovers from "./OldCovers";

export default function Cover({ cover, visitor, photos }){
    const [showCoverMneu, setShowCoverMenu] = useState(false);
    const [coverPicture, setCoverPicture] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const menuRef = useRef(null);
    const refInput = useRef(null);
    const cRef = useRef(null);
    useClickOutside(menuRef, () => setShowCoverMenu(false));
    
    const [error, setError] = useState("");
    const handleImage = (e) => {
        let file = e.target.files[0];

        if(file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/webp" && file.type !== "image/gif"){
            setError(`${file.name} format is not supported`);
            setShowCoverMenu(false);
            return; 
        } else if(file.size > 1024 * 1024 * 5){
            setError(`${file.name} is too large max 5mb allowed.`);
            setShowCoverMenu(false);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            setCoverPicture(event.target.result);
        };
    };

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);
    const getCroppedImage = useCallback(
        async(show) => {
            try{
                const img = await getCroppedImg(coverPicture, croppedAreaPixels);
                if (show) {
                    setZoom(1);
                    setCrop({ x: 0, y: 0 });
                    setCoverPicture(img);
                } else {
                    return img;
                }
            } catch(error) {
                console.log(error);
            }
        }
    );

    const coverRef = useRef(null);
    const [width, setWidth] = useState();
    useEffect(() => {
        setWidth(coverRef.current.clientWidth);
    }, [window.innerWidth]);
    const updateCoverPicture = async() => {
        try{
            setLoading(true);
            let img = await getCroppedImage();
            let blob = await fetch(img).then((b) => b.blob());

            const path = `${user.username}/cover_pictures`;
            let formData = new FormData();
            formData.append("file", blob);
            formData.append("path", path);
            const res = await uploadImages(formData, path, user.token);
            const updated_picture = await updateCover(res[0].url, user.token);

            if(updated_picture === "ok"){

            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    }

    return(
        <div className="profile_cover" ref={coverRef}> 

        </div>
    );
}