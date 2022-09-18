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

    const backgroundHandler = (i) => {
        bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
        setBackground(postBackgrounds[i]);
        bgRef.current.classList.add("bgHandler");
    };
    const removeBackground = (i) => {
        bgRef.current.style.backgroundImage = "";
        setBackground("");
        bgRef.current.classList.remove("bgHandler");
    };

    return(
        <div className={type2 ? "images_input" : ""}>
            <div className={!type2 ? "flex_center" : ""} ref={bgRef}>
                <textarea 
                    ref={textRef}
                    maxLength="250"
                    value={text}
                    placeholder={`What's on your mind, ${user.first_name}`}
                    className={`post_input ${type2 ? "input2" : ""}`}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                        paddingTop: `${
                        background
                            ? Math.abs(textRef.current.value.length * 0.1 - 32)
                            : "0"
                        }%`,
                    }}
                >
                </textarea>
            </div>
        </div>
    );
}