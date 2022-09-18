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

    useEffect = (() => {
        textRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    const handleEmoji = (e, { emoji }) => {
        const ref = text.current;
        ref.focus();
        const start = text.substring(0, ref.selectionStart);
        const end = text.substring(ref.selectionStart);
        const newText = start + emoji + end;
        setText(newText);
        setCursorPosition(start.length + emoji.length);
    }

    const postBackgrounds = [
        "../../../public/images/postBackgrounds/1.jpg", 
        "../../../public/images/postBackgrounds/2.jpg",
        "../../../public/images/postBackgrounds/3.jpg",
        "../../../public/images/postBackgrounds/4.jpg",
        "../../../public/images/postBackgrounds/5.jpg",
        "../../../public/images/postBackgrounds/6.jpg",
        "../../../public/images/postBackgrounds/7.jpg",
        "../../../public/images/postBackgrounds/8.jpg",
        "../../../public/images/postBackgrounds/9.jpg"
    ];

    return(
        <div className="">

        </div>
    );
}