import { useRef } from "react";

import Detail from "./Detail";
import useOnCLickOutside from "../../helpers/clickOutside";

export default function EditDetails({
    details,
    handleChange,
    updateDetails,
    infos,
    setVisible
}){
    const modal = useRef(null);
    useOnCLickOutside(modal, () => setVisible(false));

    return(
        <div className="blur">
            <div className="postBox infosBox" ref={modal}>
                <div className="box_header">

                </div>
            </div>
        </div>
    );
}