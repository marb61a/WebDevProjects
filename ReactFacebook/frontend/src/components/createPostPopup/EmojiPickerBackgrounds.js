import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";

export default function EmojiPickerBackgrounds({
    text,
    user,
    setText,
    type2,
    background,
    setBackground
}){
    const [picker, setPicker] = useState(false);
    const [showBgs, setShowBgs] = useState(false);
    const [cursorPosition, setCursorPosition] = useState();
    const textRef = useRef(null);
    const bgRef = useRef(null);

    const postBackgrounds = [
        "../../../public/images/postBackgrounds/1.jpg", 
        "../../../public/images/postBackgrounds/2.jpg",
        "../../../public/images/postBackgrounds/3.jpg",
        "../../../public/images/postBackgrounds/4.jpg"
    ]

    return(
        <div className="">

        </div>
    );
}