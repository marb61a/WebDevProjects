import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';

import "./style.css";

export default function Login(){
    return(
        <div className='login'>
            <div className='login_wrapper'>
                <div className='login_wrap'>
                    <div className='login_1'>
                        <img src='../../../public/icons' alt=""/>
                        <span>
                            Facebook helps you connect and share with the people in your life
                        </span>
                    </div>
                    <div className='login_2'>
                        <div className='login_2_wrap'>
                            <Formik>
                                {(formik) => (
                                    <Form>
                                        <input type="text" />
                                        <input type="text" />
                                        <button type='submit'>Log In</button>
                                    </Form>
                                )}
                            </Formik>
                            <Link to="/forgot">Forgotten Password</Link>
                            <div className='sign_splitter'></div>
                            <button className='blue_btn open_signup'>Create Account</button>
                        </div>
                        <Link to="/">
                            <b>Create a Page </b>
                            for a celebrity, brand or business
                        </Link>
                    </div>
                </div>
                <div className='register'></div>
            </div>
        </div>
    )
}