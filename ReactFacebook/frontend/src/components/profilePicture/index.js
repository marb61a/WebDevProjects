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
        
    }

    return(
        <div className="blur">
            <input />
        </div>
    );
}