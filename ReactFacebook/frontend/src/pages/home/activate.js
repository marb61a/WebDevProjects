import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import ActivateForm from "./ActivateForm";
import "./style.css";

export default function Activate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((user) => ({ ...user }));
    const [success, setSuccess] = useState("");

    return(
        <div className="home">
            {success && (
                <ActivateForm 
                    type="success"
                    header="Account verification succeded."
                    text={success}
                    loading={loading}
                />
            )}
        </div>
    );
}