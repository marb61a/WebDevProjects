import { useRef } from "react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";

export default function ImgaePreview({
    text,
    user,
    setText,
    images,
    setImages,
    setShowPrev,
    setError
}){
    const imageInputRef = useRef(null);
    const handleImages = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((img) => {
            console.log(img);

            if(
                img.type !== "image/jpeg" &&
            img.type !== "image/png" &&
            img.type !== "image/webp" &&
            img.type !== "image/gif"
            ){
                setError(`${img.name} format is not supported!! only Jpeg, Png, Webp, Gif files are allowed`);
                files = files.filter((item) => item.name !== img.name);
                return
            } else if(img.size > 1024 * 1024){
                setError(`{img.name} size is too large max 5mb allowed.`);
                files = files.filter((item) => item.name !== img.name);
                return;
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(img);
                reader.onload = (readerEvent) => {
                    setImages((images) => [...images, readerEvent.target.result]);
                };
            }
        });
    };

    return(
        <div>

        </div>
    );
}