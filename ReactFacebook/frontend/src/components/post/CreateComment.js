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

    const handleEmoji = (e, { emoji }) => {

    };

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