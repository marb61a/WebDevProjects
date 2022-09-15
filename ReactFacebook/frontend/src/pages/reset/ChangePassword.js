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
    });

    return(
        <div className="">

        </div>
    );
}