import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { useDispatch } from "react-redux";

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

    return(
        <div className="blur">
            <div className="postBox" ref={popup}>

            </div>
        </div>
    );
}