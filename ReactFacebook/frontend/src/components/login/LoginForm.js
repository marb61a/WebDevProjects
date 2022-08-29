import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import LoginInput from "../../components/inputs/loginInput";

const loginInfos = {
    email: "",
    password: ""
};

export default function({ setVisible }){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, setLogin] = useState(loginInfos);
    const { email, password } = login;
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };

    const loginValidation = Yup.object({
        email: Yup.string()
            .required("Email address is required")
            .email("Must be a valid email.")
            .max(100),
        password: Yup.string().required("Password is required")
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const loginSubmit = async() => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/login`,
                {
                    email,
                    password,
                }
            );
            dispatch({ type: "LOGIN", payload: data });
            Cookies.set("user", JSON.stringify(data));
            navigate("/");            
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };

    return(
        <div className="login_wrap">

        </div>
    )
}