import React, { useState } from 'react'
import { RootState } from '../../../redux/store';
import { connect } from 'react-redux';
import { loading } from '../../../redux/Loader/loader.action';
import { Button, Col, Form, Row } from 'react-bootstrap';
import forgot_password from '../../../assets/imgaes/forgot-password.svg';
import verification from '../../../assets/imgaes/verification.svg';
import captcha from '../../../assets/imgaes/captcha.png';
import google from '../../../assets/imgaes/google.svg';
import bg_shape from '../../../assets/imgaes/bg-shape.png';
import AuthSidebar from '../../../components/AuthSidebar/AuthSidebar';
import { ENUMFORFORGOTPASSWORDSTEP, ENUMFORROUTES, ForgotPasswordData } from '../../../interfaces/interface';
import { useNavigate } from 'react-router';
import { ForgotPasswordDataAPI, SendOtpToEmailAPI, getVerifyOtpAPI } from '../../../redux/Service/forgotPassword';

const ForgotPassword = (props) => {
    /**
* Retrieves the navigation function from the React Router.
*/
    const navigate = useNavigate();
    /**
     * Navigates to a related screen based on the provided route and optional state.
     * @param route The route to navigate to.
     * @param val Optional state to pass along with the navigation.
     */
    const navigateToRelatedScreen = (route: any, val?: any) => {

        if (val) {
            navigate(route, { state: val })
        }
        else {
            navigate(route)
        }
    }

    const [forgotPasswordStep, setForgotPasswordStep] = useState<any>(ENUMFORFORGOTPASSWORDSTEP.EMAIL);
    /**
   * Function to change the sign-up step.
   * @param step The step to set as the current sign-up step.
   */
    const changeStep = (step) => {
        if (!(step === forgotPasswordStep)) {
            setForgotPasswordStep(step);

        }
    }
    const initialValuesForPassword: ForgotPasswordData = {
        confirmPassword: "",
        email: "",
        otp: "",
        password: ""

    }
    const onSubmitValues=()=>{};

    return (
        <div className="auth-wrapper">
            <div className="login-wrapper">
                <div className="login-left">

                    {
                        forgotPasswordStep === ENUMFORFORGOTPASSWORDSTEP.EMAIL &&
                        <div className="login-left-wrapper">
                            <div className="auth-bg-shape">
                                <img src={bg_shape} alt="" />
                            </div>
                            <div className="auth-title">
                                <img src={forgot_password} alt="logo" />
                                <h1>Forgot Password </h1>
                            </div>
                            <div className="auth-form">
                                <p>Continue with email address</p>
                                <Form>
                                    <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                        <div className="from-control-icon">
                                            <i className="control-icon bi bi-envelope"></i>
                                            <Form.Control type="email" placeholder="Your email" />
                                        </div>
                                    </Form.Group>

                                    <div className="auth-btn-group">
                                        <Button variant="primary">Continue</Button>
                                    </div>
                                    <div className="sign-up-link">
                                        <p className='text-center'>Back to <a href="#">Sign In</a></p>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    }
                    {
                        forgotPasswordStep === ENUMFORFORGOTPASSWORDSTEP.VERIFY_OTP &&
                        <div className="login-left-wrapper ">
                            <div className="auth-bg-shape">
                                <img src={bg_shape} alt="" />
                            </div>
                            <div className="auth-title">
                                <img src={verification} alt="logo" />
                                <h1>Verification</h1>
                                <p>Enter the Verification Code send to <span>jecob@gmail.com</span><a href="#"><i className="bi bi-pencil"></i></a> </p>
                            </div>
                            <div className="auth-form otp-form">
                                {/* <p>Continue with email address</p> */}
                                <Form>
                                    <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                        <div className="otp-input">
                                            <Form.Control type="text" placeholder="" />
                                            <Form.Control type="text" placeholder="" />
                                            <Form.Control type="text" placeholder="" />
                                            <Form.Control type="text" placeholder="" />
                                        </div>
                                    </Form.Group>

                                    <div className="resend-code">
                                        <p className='text-center'>Resend Code In: <span>01:30</span></p>
                                    </div>

                                    <div className="auth-btn-group">
                                        <Button variant="primary">Verify</Button>
                                    </div>
                                    <div className="sign-up-link">
                                        <p className='text-center'>Back to <a href="#">Sign Up</a></p>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    }
                    {
                        forgotPasswordStep === ENUMFORFORGOTPASSWORDSTEP.CHANGE_PASSWORD &&
                        <div className="login-left-wrapper ">
                            <div className="auth-bg-shape">
                                <img src={bg_shape} alt="" />
                            </div>
                            <div className="auth-title">
                                <img src={forgot_password} alt="logo" />
                                <h1>Set New Password </h1>
                            </div>
                            <div className="auth-form">
                                <p>Continue with email address</p>
                                <Form>
                                    <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                        <div className="from-control-icon">
                                            <i className="control-icon bi bi-lock"></i>
                                            <Form.Control type="password" placeholder="New Password" />
                                            <button className='password-eye'>
                                                <i className="bi bi-eye d-none"></i>
                                                <i className="bi bi-eye-slash"></i>
                                            </button>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                        <div className="from-control-icon">
                                            <i className="control-icon bi bi-lock"></i>
                                            <Form.Control type="password" placeholder="Confirm Password" />
                                            <button className='password-eye'>
                                                <i className="bi bi-eye d-none"></i>
                                                <i className="bi bi-eye-slash"></i>
                                            </button>
                                        </div>
                                    </Form.Group>

                                    <div className="auth-btn-group">
                                        <Button variant="primary">Continue</Button>
                                    </div>
                                    <div className="sign-up-link">
                                        <p className='text-center'>Back to <a href="#">Sign In</a></p>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    }

                    {
                        forgotPasswordStep === ENUMFORFORGOTPASSWORDSTEP.CHANGED_COMPLETED &&
                        <div className="login-left-wrapper ">
                            <div className="auth-bg-shape">
                                <img src={bg_shape} alt="" />
                            </div>
                            <div className="auth-title">
                                <img src={verification} alt="logo" />
                                <h1>Password updated!</h1>
                                <p>Your password has been changed successfully. <br />
                                    use your new password to log in.</p>
                            </div>
                            <div className="auth-form otp-form">
                                {/* <p>Continue with email address</p> */}
                                <Form>
                                    <div className="auth-btn-group">
                                        <Button variant="primary" onClick={() => { navigateToRelatedScreen(ENUMFORROUTES.LOGIN) }}>Back to Log In Page</Button>
                                    </div>

                                </Form>
                            </div>
                        </div>}

                </div>
                <div className="login-right">
                    <AuthSidebar />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {

    };

};

const mapDispatchToProps = {
    getVerifyOtpAPI,
    SendOtpToEmailAPI,
    ForgotPasswordDataAPI

};
export default ForgotPassword