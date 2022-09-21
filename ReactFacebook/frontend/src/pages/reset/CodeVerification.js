import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

import LoginInput from "../../components/inputs/loginInput";

export default function CodeVerification({
    code,
    setCode,
    error,
    loading,
    setLoading,
    setVisible,
    setError,
    userInfos,
}) {

}