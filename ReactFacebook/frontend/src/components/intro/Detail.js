import { useState } from "react";

import Bio from "./Bio";

export default function Detail({
    img,
    value,
    placeholder,
    name,
    handleChange,
    updateDetails,
    infos,
    text,
    rel
}){
    const [show, setShow] = useState(false);
    return(
        <div>
            <div className="add_details_flex" onClick={() => setShow(true)}>
                {value ? (
                    <div>
                        
                    </div>
                ) : (
                    <>
                        <i></i>
                    </>    
                )}
            </div>
        </div>
    );
}