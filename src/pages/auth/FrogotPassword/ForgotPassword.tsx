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
import * as yup from 'yup';
import { CONFIRM_PASSWORD_NOT_MATCHED, PASSWORD_INVALID, PATTERN_EMAIL, PATTERN_FOR_PASSWORD, PATTERN_FOR_PASSWORD_NEW } from '../../../Utility/Validation_Helper';
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import { customJsonInclude, isNullUndefinedOrBlank, renderError } from '../../../Utility/Helper';
import OTPInput from 'react-otp-input';
import { Link } from 'react-router-dom';
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

    /**
 * State variable to manage the current step in the forgot password process.
 */
    const [forgotPasswordStep, setForgotPasswordStep] = useState<any>(ENUMFORFORGOTPASSWORDSTEP.EMAIL);
    /**
 * State variable to manage the toggle state of the password visibility in the input field.
 */
    const [eyeToggle, setEyeToggle] = useState<any>(false);
    /**
 * State variable to manage the toggle state of the password confirmation visibility in the input field.
 */
    const [eyeConfirmToggle, setEyeConfirmToggle] = useState<any>(false);
    /**
   * Function to change the sign-up step.
   * @param step The step to set as the current sign-up step.
   */
    const changeStep = (step) => {
        if (!(step === forgotPasswordStep)) {
            setForgotPasswordStep(step);

        }
    }
    /**
 * Initial values for the forgot password form.
 */
    const initialValuesForgotPassword: ForgotPasswordData = {
        confirmPassword: "",
        email: "",
        otp: "",
        password: ""

    }
    /**
 * Function to handle form submission.
 */
    const onSubmitValues = () => { };
    /**
 * Validation schema for forgot password form.
 */
    const validationSchemaForForgotPassword = yup.object({
        email: yup.string().when(
            () => {
                return forgotPasswordStep === ENUMFORFORGOTPASSWORDSTEP.EMAIL ? yup.string().trim().matches(PATTERN_EMAIL, "Please Enter a valid Email.").required("Email is required !!") : yup.string()
            }),
        password: yup.string()
            .when(
                () => {
                    return forgotPasswordStep === ENUMFORFORGOTPASSWORDSTEP.CHANGE_PASSWORD ?
                        yup.string().trim()
                            // .matches(PATTERN_FOR_PASSWORD, PASSWORD_INVALID)
                            .matches(PATTERN_FOR_PASSWORD, "Please Enter a valid Password .")
                            .required("New Password is Required!!") : yup.string()
                }),
        confirmPassword: yup.string()
            .when('password', ([password]) => {
                return password?.length > 0 && forgotPasswordStep === ENUMFORFORGOTPASSWORDSTEP.CHANGE_PASSWORD ? yup.string().required(" Confirm Password Is Required!!").oneOf([yup.ref("password")], `${CONFIRM_PASSWORD_NOT_MATCHED}`) : yup.string()
            })

    })
    /**
 * Formik hook for handling forgot password form data.
 */
    const forgotPasswordFormData = useFormik({
        initialValues: initialValuesForgotPassword,
        onSubmit: onSubmitValues,
        validationSchema: validationSchemaForForgotPassword
    })
    /**
 * Function to handle submission of forgot password form data.
 * Handles different steps of the forgot password process.
 */
    const handleSubmitData = async () => {
        forgotPasswordFormData.handleSubmit();
        const forgotPasswordFormErrors = await forgotPasswordFormData.validateForm();
        if (Object.keys(forgotPasswordFormErrors).length > 0) {
            forgotPasswordFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(forgotPasswordFormErrors, true));

            return;
        }
        const reqBody = { ...forgotPasswordFormData.values }
        if (forgotPasswordStep === ENUMFORFORGOTPASSWORDSTEP.EMAIL) {
            customJsonInclude(reqBody);

            const sendOtpToEmailResponse = await props.SendOtpToEmailAPI(reqBody);
            if (sendOtpToEmailResponse) {
                changeStep(ENUMFORFORGOTPASSWORDSTEP.VERIFY_OTP);
                return;
            }
        }
        if (forgotPasswordStep === ENUMFORFORGOTPASSWORDSTEP.VERIFY_OTP) {
            customJsonInclude(reqBody);

            const verifyOtpResponse = await props.getVerifyOtpAPI(reqBody);
            if (verifyOtpResponse) {
                changeStep(ENUMFORFORGOTPASSWORDSTEP.CHANGE_PASSWORD);
                return;
            }
        }
        if (forgotPasswordStep === ENUMFORFORGOTPASSWORDSTEP.CHANGE_PASSWORD) {
            delete reqBody.otp;
            delete reqBody.confirmPassword;
            customJsonInclude(reqBody);

            const changePasswordResponse = await props.ForgotPasswordDataAPI(reqBody);
            if (changePasswordResponse) {
                changeStep(ENUMFORFORGOTPASSWORDSTEP.CHANGED_COMPLETED);
                return;
            }
        }
    }
    /**
 * Function to handle key press events.
 * If the key pressed is Enter (keyCode 13), it prevents the default behavior and calls the handleSubmitData function.
 * @param event The key press event.
 */
    const handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleSubmitData();
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-wrapper">
                <div className="auth-left">

                    {
                        forgotPasswordStep === ENUMFORFORGOTPASSWORDSTEP.EMAIL &&
                        <div className="auth-left-wrapper">
                            <div className="auth-bg-shape">
                                <img src={bg_shape} alt="bg_shape" />
                            </div>
                            <div className="auth-title">
                                <img src={forgot_password} alt="logo" />
                                <h1>Forgot Password </h1>
                            </div>
                            <div className="auth-form">
                                <p>Continue with email address</p>

                                <Form.Group className="form-group" >
                                    <div className="from-control-icon">
                                        <i className="control-icon bi bi-envelope"></i>
                                        <Form.Control type="email" placeholder="Your email" onKeyDown={(event) => { handleKeyPress(event) }} {...forgotPasswordFormData.getFieldProps("email")} />
                                    </div>
                                    {forgotPasswordFormData.touched.email &&
                                        forgotPasswordFormData.errors.email
                                        ? renderError(forgotPasswordFormData.errors?.email)
                                        : null}
                                </Form.Group>

                                <div className="auth-btn-group">
                                    <Button variant="primary" onClick={() => { handleSubmitData() }} type="button" >Continue</Button>
                                </div>
                                <div className="sign-up-link" onClick={() => { navigateToRelatedScreen(ENUMFORROUTES.LOGIN) }}>
                                    <p className='text-center'>Back to <Link to="/sign-in" className="text-primary"> Sign In</Link></p>
                                </div>

                            </div>
                        </div>
                    }
                    {
                        forgotPasswordStep === ENUMFORFORGOTPASSWORDSTEP.VERIFY_OTP &&
                        <div className="auth-left-wrapper ">
                            <div className="auth-bg-shape">
                                <img src={bg_shape} alt="bg_shape" />
                            </div>
                            <div className="auth-title">
                                <img src={verification} alt="logo" />
                                <h1>Verification</h1>
                                <p>Enter the Verification Code send to <span>{!isNullUndefinedOrBlank(forgotPasswordFormData.values.email) ? forgotPasswordFormData.values.email : "-"}</span><a onClick={() => { changeStep(ENUMFORFORGOTPASSWORDSTEP.EMAIL); forgotPasswordFormData.setFieldValue("otp", "") }}><i className="bi bi-pencil"></i></a> </p>
                            </div>
                            <div className="auth-form otp-form">
                                {/* <p>Continue with email address</p> */}

                                {/* <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                        <div className="otp-input">
                                            <Form.Control type="text" placeholder="" />
                                            <Form.Control type="text" placeholder="" />
                                            <Form.Control type="text" placeholder="" />
                                            <Form.Control type="text" placeholder="" />
                                        </div>
                                    </Form.Group>

                                    <div className="resend-code">
                                        <p className='text-center'>Resend Code In: <span>01:30</span></p>
                                    </div> */}
                                <OTPInput
                                    value={forgotPasswordFormData.values.otp}
                                    onChange={(value) => { forgotPasswordFormData.setFieldValue("otp", value) }}

                                    renderInput={(props) => <input {...props} />}
                                    inputType="number"

                                    // autoFocus={true}  
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}

                                />

                                <div className="auth-btn-group">
                                    <Button variant="primary" disabled={forgotPasswordFormData.values.otp?.length !== 6} onClick={() => { handleSubmitData() }}>Verify</Button>
                                </div>
                                <div className="sign-up-link">
                                    <p className='text-center'>Back to <a onClick={() => { navigateToRelatedScreen(ENUMFORROUTES.LOGIN) }}>Sign in</a></p>
                                </div>

                            </div>
                        </div>
                    }
                    {
                        forgotPasswordStep === ENUMFORFORGOTPASSWORDSTEP.CHANGE_PASSWORD &&
                        <div className="auth-left-wrapper ">
                            <div className="auth-bg-shape">
                                <img src={bg_shape} alt="bg_shape" />
                            </div>
                            <div className="auth-title">
                                <img src={forgot_password} alt="logo" />
                                <h1>Set New Password </h1>
                            </div>
                            <div className="auth-form">
                                <p>Continue with email address</p>

                                <Form.Group className="form-group" >
                                    <div className="from-control-icon">
                                        <i className="control-icon bi bi-lock"></i>
                                        <Form.Control type={eyeToggle ? "text" : "password"} placeholder="New Password" {...forgotPasswordFormData.getFieldProps("password")} />
                                        {forgotPasswordFormData.touched.password &&
                                            forgotPasswordFormData.errors.password
                                            ? renderError(forgotPasswordFormData.errors?.password)
                                            : null}
                                        <button type='button' className='password-eye' onClick={() => { setEyeToggle(!eyeToggle) }}>
                                            {
                                                eyeToggle ?
                                                    <i className="bi bi-eye "></i>
                                                    :
                                                    <i className="bi bi-eye-slash"></i>
                                            }
                                        </button>
                                    </div>
                                </Form.Group>
                                <Form.Group className="form-group" >
                                    <div className="from-control-icon">
                                        <i className="control-icon bi bi-lock"></i>
                                        <Form.Control type={eyeConfirmToggle ? "text" : "password"} placeholder="Confirm Password"  {...forgotPasswordFormData.getFieldProps("confirmPassword")} />
                                        {forgotPasswordFormData.touched.confirmPassword &&
                                            forgotPasswordFormData.errors.confirmPassword
                                            ? renderError(forgotPasswordFormData.errors?.confirmPassword)
                                            : null}
                                        <button type='button' className='password-eye' onClick={() => { setEyeConfirmToggle(!eyeConfirmToggle) }}>
                                            {
                                                eyeConfirmToggle ?
                                                    <i className="bi bi-eye "></i>
                                                    :
                                                    <i className="bi bi-eye-slash"></i>
                                            }
                                        </button>
                                    </div>
                                </Form.Group>

                                <div className="auth-btn-group">
                                    <Button variant="primary" onClick={() => { handleSubmitData() }}>Continue</Button>
                                </div>
                                <div className="sign-up-link">
                                    <p className='text-center'>Back to <a onClick={() => { navigateToRelatedScreen(ENUMFORROUTES.LOGIN) }}>Sign In</a></p>
                                </div>

                            </div>
                        </div>
                    }

                    {
                        forgotPasswordStep === ENUMFORFORGOTPASSWORDSTEP.CHANGED_COMPLETED &&
                        <div className="auth-left-wrapper ">
                            <div className="auth-bg-shape">
                                <img src={bg_shape} alt="bg_shape" />
                            </div>
                            <div className="auth-title">
                                <img src={verification} alt="logo" />
                                <h1>Password updated!</h1>
                                <p>Your password has been changed successfully. <br />
                                    use your new password to log in.</p>
                            </div>
                            <div className="auth-form otp-form">
                                {/* <p>Continue with email address</p> */}

                                <div className="auth-btn-group">
                                    <Button variant="primary" onClick={() => { navigateToRelatedScreen(ENUMFORROUTES.LOGIN) }}>Back to Log In Page</Button>
                                </div>


                            </div>
                        </div>}

                </div>
                <div className="auth-right">
                    <AuthSidebar />
                </div>
            </div >
        </div >
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
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
// export default ForgotPassword 