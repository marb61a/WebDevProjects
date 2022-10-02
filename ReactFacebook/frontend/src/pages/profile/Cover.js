import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

import { updateCover } from "../../functions/user";
import { createPost } from "../../functions/post";
import { uploadImages } from "../../functions/uploadImages";
import useClickOutside from "../../helpers/clickOutside";
import getCroppedImg from "../../helpers/getCroppedImg";

export default function Cover({ cover, visitor, photos }){
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const menuRef = useRef(null);
    const refInput = useRef(null);
    const cRef = useRef(null);
    useClickOutside(menuRef, () => setShowCoverMenu(false));
    
    const [error, setError] = useState("");
    const handleImage = (e) => {

    };

    return(
        <div className="profile_cover" ref={coverRef}> 

        </div>
    );
}