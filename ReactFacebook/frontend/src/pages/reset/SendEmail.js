import axios from "axios";
import { Link } from "react-router-dom";

export default function SendEmail({
    userInfos,
    email,
    error,
    setError,
    setVisible,
    setUserInfos,
    loading,
    setLoading
}) {
    const sendEmail = async() => {
        try{
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`, { email });

            setError("");
            setVisible(2);
            setLoading(false);
        } catch(error){
            setLoading(false);
            setError(error.response.data.message);
        }
    };

    return(
        <div className="reset_form dynamic_height">

        </div>
    )
}