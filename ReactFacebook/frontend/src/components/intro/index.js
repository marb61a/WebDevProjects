import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Bio from "./Bio";
import "./style.css";
import EditDetails from "./EditDetails";

export default function Intro({ detailss, visitor, setOthername }) {
    const [details, setDetails] = useState();
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setDetails(detailss);
        setInfos(detailss);
    }, [detailss]);
    const initial = {
        bio: details?.bio ? details.bio : "",
        otherName: details?.otherName ? details.otherName : "",
        job: details?.job ? details.job : "",
        workplace: details?.workplace ? details.workplace : "",
        highSchool: details?.highSchool ? details.highSchool : "",
        college: details?.college ? details.college : "",
        currentCity: details?.currentCity ? details.currentCity : "",
        hometown: details?.hometown ? details.hometown : "",
        relationship: details?.relationship ? details.relationship : "",
        instagram: details?.instagram ? details.instagram : ""
    };
    const [infos, setInfos] = useState(initial);
    const [showBio, setShowBio] = useState(false);
    const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);

    const updateDetails = async () => {
        try{
            console.log("sent");

        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    return(
        <div className="profile_card">
            <div className="profile_card_header">Intro</div>
            {details?.bio && !showBio && (
                <div></div>
            )}
        </div>
    );
}