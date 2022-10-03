import { useState } from "react";

const reactsArray = [
    {
        name: "like",
        image: "../../../public/reacts/like.gif",
    },
    {
        name: "love",
        image: "../../../public/reacts/love.gif",
    },
    {
        name: "haha",
        image: "../../../public/reacts/haha.gif",
    },
    {
        name: "wow",
        image: "../../../public/reacts/wow.gif",
    },
    {
        name: "sad",
        image: "../../../public/reacts/sad.gif",
    },
    {
        name: "angry",
        image: "../../../public/reacts/angry.gif"
    }
];

export default function ReactsPopup({ visible, setVisible }){
    return(
        <>
            {visible && (
                <div
                    className="reacts_popup"
                >

                </div>
            )}
        </>
    )
}