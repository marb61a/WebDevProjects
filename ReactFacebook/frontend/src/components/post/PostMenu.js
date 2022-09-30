import { useRef, useState } from "react";

import MenuItem from "./MenuItem";
import useOnClickOutside from "../../helpers/clickOutside";

export default function PostMenu({
    postUserId,
    userId,
    imagesLength,
    setShowMenu,
}){
    const [test, setTest] = useState(postUserId === userId ? true : false);
    const menu = useRef(null);
    useOnClickOutside(menu, () => setShowMenu(false));

    return(
        <ul className="post_menu" ref={menu}>
            {test && <MenuItem icon="pin_icon" title="Pin Post" />}
            <MenuItem 
                icon="save_icon"
                title="Save Post"
                subtitle="Add this to your saved items."
            />
            <div className="line"></div>
            
        </ul>
    )
}