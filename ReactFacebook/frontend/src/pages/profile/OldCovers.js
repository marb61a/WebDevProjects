import { useRef } from "react";

import { useSelector } from "react-redux";
import useClickOutside from "../../helpers/clickOutside";

export default function OldCovers({ photos, setCoverPicture, setShow }){
    const { user } = useSelector((state) => ({ ...state }));
    const Ref = useRef(null);
    useClickOutside(Ref, () => setShow(false));

    return(
        <div className="blur">
            <div className="postBox selectCoverBox" ref={Ref}>
                <div className="box_header">
                    <div className="small_circle" onClick={() => {setShow(false);}}>
                        <i className="exit_icon"></i>
                    </div>
                    <span>Select Photo</span>
                </div>
                <div className="selectCoverBox_links">
                    <div className="selectCoverBox_link">Recent Photos</div>
                    <div className="selectCoverBox_link">Photo Albums</div>
                </div>
                
            </div>
        </div>
    );
}