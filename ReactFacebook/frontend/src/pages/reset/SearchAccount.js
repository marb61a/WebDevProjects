import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

import LoginInput from "../../components/inputs/loginInput";

export default function SearchAccount({
    email,
    setEmail,
    error,
    setError,
    setLoading,
    setUserInfos,
    setVisible    
}){
    const validateEmail = Yup.object({
        email: Yup.string()
            .required()
    });

    const handleSearch = async() => {
        try{
            setLoading(true);
        } catch(error){
            setLoading(false);
        }
    };

    return(
        <div>

        </div>
    );
}