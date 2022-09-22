import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

import LoginInput from "../../components/inputs/loginInput";

export default function ChangePassword({
    password,
    setPassword,
    conf_password,
    setConf_password,
    error,
    loading,
    setLoading,
    userInfos,
    setError,
}){
    const navigate = useNavigate();
    const validatepassword = Yup.object({
        password: Yup.string()
            .required("Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).")
            .min(6, "Passwords must be at least 6 characters")
            .max(36, "Password can't be more than 36 characters"),
        conf_password: Yup.string()
            .required("Confirm your password")
            .oneOf([Yup.ref("password")], "Passwords must match.")
    });

    const { email } = userInfos;
    const changePassword = async() => {
        try{
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
                email, 
                password
            });
            setError("");
            navigate("/");
        } catch(error){
            setLoading(false);
            setError(error.response.data.message);
        }
    }

    return(
        <div className="reset_form" style={{ height: "310px" }}>
            <div className="reset_form_header">Change Password</div>
            <div className="reset_form_text">Pick a Strong Password</div>
            <Formik
            
            >

            </Formik>
        </div>
    );
}