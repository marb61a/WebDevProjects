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

    const registerValidation = Yup.object({
        first_name: Yup.string()
            .required("What's your First name ?")
            .min(2, "Fisrt name must be between 2 and 16 characters.")
            .max(16, "Fisrt name must be between 2 and 16 characters.")
            .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
        last_name: Yup.string()
            .required("What's your Last name ?")
            .min(2, "Last name must be between 2 and 16 characters.")
            .max(16, "Last name must be between 2 and 16 characters.")
            .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
        email: Yup.string()
            .required(
                "You'll need this when you log in and if you ever need to reset your password."
            )
            .email("Enter a valid email address."),
        password: Yup.string()
            .required(
              "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
            )
            .min(6, "Password must be atleast 6 characters.")
            .max(36, "Password can't be more than 36 characters")
    });

    const [dateError, setDateError] = useState("");
    const [genderError, setGenderError] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const registerSubmit = async() => {
        try{

        } catch(error) {

        }
    }

    return(
        <div className="blur">
            <div className="register">
                <div className="register_header">
                    <i className="exit_icon" onClick={() => setVisible(false)}></i>
                    <span>Sign Up</span>
                    <span>it's quick and easy</span>
                </div>
                <Formik
                    enableReinitialize
                    initialValues={{
                        first_name,
                        last_name,
                        email,
                        password,
                        bYear,
                        bMonth,
                        bDay,
                        gender
                    }}
                    validationSchema={registerValidation}
                    onSubmit={() => {
                        let current_date = new Date();
                        let picked_date = new Date(bYear, bMonth - 1, bDay);
                        let atleast14 = new Date(1970 + 14, 0, 1);
                    }}
                >
                    {(formik) => (
                        <Form className="register_form">
                            <div className="reg_line">

                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}