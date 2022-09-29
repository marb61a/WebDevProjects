import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import "./style.css";

export default function Intro() {
    const [visible, setVisible] = useState(false);
    const updateDetails = async () => {
        console.log("sent");
    };

    return(
        <div>

        </div>
    );
}