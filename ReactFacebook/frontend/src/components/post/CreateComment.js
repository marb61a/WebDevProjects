import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";

export default function CreateComment({ user }){
    const [picker, setPicker] = useState(false);
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [commentImage, setCommentImage] = useState("");
    const [cursorPosition, setCursorPosition] = useState();
    const textRef = useRef(null);
    const imgInput = useRef(null);

    useEffect(() => {
        textRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    const handleEmoji = (e, { emoji }) => {
        const ref = textRef.current;
        ref.focus();
        const start = text.substring(0, ref.selectionStart);
        const end = text.substring(ref.selectionStart);
        const newText = start + emoji + end;
        setText(newText);
        setCursorPosition(start.length + emoji.length);
    };

    const handleImage = (e) => {
        let file = e.target.files[0];

        if(file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/webp" && file.type !== "image/gif"){
            setError(`${file.name} format is not supported.`);
            return;
        } else if (file.size > 1024 * 1024 * 5) {
            setError(`${file.name} is too large max 5mb allowed.`);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            setCommentImage(event.target.result);
        };
    }

    return(
        <div className="create_comment_wrap">
            <div className="create_comment">
                <img src={user?.picture} alt="" />
                <div className="comment_input_wrap">
                    {picker &&(
                        <div className="comment_emoji_picker">
                            <Picker onEmojiClick={handleEmoji}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}