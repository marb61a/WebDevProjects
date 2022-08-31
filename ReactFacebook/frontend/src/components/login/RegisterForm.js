import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import RegisterInput from "../inputs/registerInput";

export default function RegisterForm({ setVisible }){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfos = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        bYear: new Date().getFullYear(),
        bMonth: new Date().getMonth() + 1,
        bDay: new Date().getDate(),
        gender: "",
    };
    const [user, setUser] = useState(userInfos);
      
    const {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender,
    } = user;
    const yearTemp = new Date().getFullYear();
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const years = Array.from(new Array(108), (val, index) => yearTemp - index);
    const months = Array.from(new Array(12), (val, index) => 1 + index);
    const getDays = () => {
        return new Date(bYear, bMonth, 0).getDate();
    };
    const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

    
}