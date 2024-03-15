import React, { useEffect, useState } from 'react'
import { RootState } from '../../../redux/store';
import { connect } from 'react-redux';
import { loading } from '../../../redux/Loader/loader.action';
import { Button, Col, Form, Row } from 'react-bootstrap';
import logo from '../../../assets/imgaes/auth-logo-small.svg';
import captcha from '../../../assets/imgaes/captcha.png';
import google from '../../../assets/imgaes/google.svg';
import bg_shape from '../../../assets/imgaes/bg-shape.png';
import AuthSidebar from '../../../components/AuthSidebar/AuthSidebar';
import { useNavigate } from 'react-router';
import { DropdownListFormat, ENUMFORROUTES, ENUMFORSIGNUPSTEP, SignUpData } from '../../../interfaces/interface';
import * as yup from 'yup';
import { PATTERN_EMAIL } from '../../../Utility/Validation_Helper';
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import { customJsonInclude, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank, renderError } from '../../../Utility/Helper';
import { getRegenerateCaptchaAPI } from '../../../redux/Service/generic';
import { SignUpDataAPI } from '../../../redux/Service/signup';
import { SendOtpDataAPI } from './../../../redux/Service/signup';
import { getGenerateCaptchaAPI, getCountryPrefixAPI, getVerifyCaptchaAPI } from './../../../redux/Service/generic';
import Select from "react-select";
import OTPInput from 'react-otp-input';
const Signup = (props) => {
    /**Hook from React Router for navigation  */
    const navigate = useNavigate();
    /**
     * Function to navigate to a related screen.
     * @param route The route to navigate to.
     * @param val Optional state object to pass to the target route.
     */
    const navigateToRelatedScreen = (route: any, val?: any) => {

        if (val) {
            /**  Navigate to the specified route with optional state */
            navigate(route, { state: val })
        }
        else {
            /** Navigate to the specified route */
            navigate(route)
        }

    }

    /**
 * Represents the current step in the sign-up process.
 */
    const [signUpStep, setSignUpStep] = useState<String>(ENUMFORSIGNUPSTEP.VERIFY_OTP);
    const [captchaImgUrl, setCaptchaImgUrl] = useState<any>("");
    const [countryCodeDropDownData, setCountyCodeDropDownData] = useState<Array<DropdownListFormat>>([]);
    /**
     * Function to change the sign-up step.
     * @param step The step to set as the current sign-up step.
     */
    const changeStep = (step) => {
        if (!(step === signUpStep)) {
            setSignUpStep(step);
            userDetailsFormData.setFieldValue("otp", "");
            userDetailsFormData.setFieldValue("hiddenCaptcha", "");
        }

    }

    const initUserDetails: SignUpData = {
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        countryCode: "",
        uuid: "",
        otp: "",
        requestId: "",
        hiddenCaptcha: "",
    }
    const onSubmitUserDetails = (values) => {
        // console.log(values);

    }
    const handleUserDetailsSubmit = async () => {
        userDetailsFormData.handleSubmit();
        const userDetailsErrors = await userDetailsFormData.validateForm();
        if (Object.keys(userDetailsErrors).length > 0) {
            userDetailsFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(userDetailsErrors, true));

            return;
        }
        const reqBody = { ...userDetailsFormData.values }
        const verifyCaptchaResponse = await handleVerifyCaptcha(reqBody);
        if (!verifyCaptchaResponse) {
            return;
        }
        const sendOtpToEmailResponse = await handleSendOtp(reqBody);
        if (sendOtpToEmailResponse) {
            changeStep(ENUMFORSIGNUPSTEP.VERIFY_OTP);
            return;
        }

    }
    const validationUserDetails = yup.object({
        firstName: yup.string().required("First Name is required !!"),
        lastName: yup.string().required("Last Name is required !!"),
        email: yup.string().trim().matches(PATTERN_EMAIL, "Please Enter a valid Email.").required("Email is required !!"),
        mobileNo: yup.string()
            .trim()
            .min(7, "Please Enter a valid Mobile No.").required("Mobile No Required!!"),
        countryCode: yup.string().required("Country Code is required !!"),
        hiddenCaptcha: yup.string().required("Captcha is required !!")

    })
    const userDetailsFormData = useFormik({
        initialValues: initUserDetails,
        onSubmit: onSubmitUserDetails,
        validationSchema: validationUserDetails,
    })

    console.log(userDetailsFormData.values.otp, "otp");
    useEffect(() => {

        handleGenerateCaptcha();
        props.getCountryPrefixAPI();
        return () => {

        }
    }, [])

    useEffect(() => {

        setCountyCodeDropDownData(!isEmptyObjectOrNullUndefiend(props.countryPrefixData) ? props.countryPrefixData : []);
        // console.log(props.countryPrefixData, "country Code");
    }, [props.countryPrefixData])


    const handleGenerateCaptcha = async () => {
        const response = await props.getGenerateCaptchaAPI();

        if (response) {
            setCaptchaImgUrl(!isNullUndefinedOrBlank(response?.payload?.realCaptcha) ? response?.payload?.realCaptcha : "");
            userDetailsFormData.setFieldValue("uuid", !isNullUndefinedOrBlank(response?.payload?.uuid) ? response?.payload?.uuid : "");
        }
    }
    const handleRegenerateCaptcha = async () => {
        const reqBody = { uuId: userDetailsFormData.values.uuid }
        const response = await props.getRegenerateCaptchaAPI(reqBody);

        if (response) {
            setCaptchaImgUrl(!isNullUndefinedOrBlank(response?.payload?.realCaptcha) ? response?.payload?.realCaptcha : "");
            userDetailsFormData.setFieldValue("uuid", !isNullUndefinedOrBlank(response?.payload?.uuid) ? response?.payload?.uuid : "");
        }
    }

    const handleVerifyCaptcha = async (req) => {
        const newData: SignUpData = { ...req };
        const reqBody = {
            uuId: newData.uuid,
            hiddenCaptcha: newData.hiddenCaptcha,
        }
        const response = await props.getVerifyCaptchaAPI(reqBody);
        console.log(response);
        if (response) {

            return true;
        }
    }
    const handleSendOtp = async (req) => {
        const newData: SignUpData = { ...req };
        // delete newData.uuid;
        delete newData.hiddenCaptcha;
        customJsonInclude(newData);

        const response = await props.SendOtpDataAPI(newData);
        if (response) {
            return true;
        }
    }


    const handleVerifyAndSubmitDetails = async () => {
        userDetailsFormData.handleSubmit();
        const userDetailsErrors = await userDetailsFormData.validateForm();
        if (Object.keys(userDetailsErrors).length > 0) {
            userDetailsFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(userDetailsErrors, true));

            return;
        }
        const reqBody = { ...userDetailsFormData.values }
        const reponse = await props.SignUpDataAPI(reqBody);
        console.log(reponse, "response");
    }
    return (
        <>
            <div className="auth-wrapper">
                <div className="login-wrapper">
                    <div className="login-left">
                        <div className="login-left-wrapper">
                            <div className="auth-bg-shape">
                                <img src={bg_shape} alt="" />
                            </div>
                            <div className="auth-title">
                                <img src={logo} alt="logo" />
                                <h1>Sign Up</h1>
                            </div>
                            {
                                signUpStep === ENUMFORSIGNUPSTEP.USER_DETAILS &&

                                <div className="auth-form">
                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Group className="form-group" >
                                                    <div className="from-control-icon">
                                                        <i className="control-icon bi bi-person-circle"></i>
                                                        <Form.Control type="text" placeholder="First Name" {...userDetailsFormData.getFieldProps("firstName")} />
                                                        {userDetailsFormData.touched.firstName &&
                                                            userDetailsFormData.errors.firstName
                                                            ? renderError(userDetailsFormData.errors.firstName)
                                                            : null}
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="form-group" >
                                                    <div className="from-control-icon">
                                                        <i className="control-icon bi bi-person-circle"></i>
                                                        <Form.Control type="text" placeholder="Last Name" {...userDetailsFormData.getFieldProps("lastName")} />
                                                        {userDetailsFormData.touched.lastName &&
                                                            userDetailsFormData.errors.lastName
                                                            ? renderError(userDetailsFormData.errors.lastName)
                                                            : null}
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Group className="form-group" >
                                            <div className="from-control-icon">
                                                <i className="control-icon bi bi-envelope"></i>
                                                <Form.Control type="email" placeholder="Your email" {...userDetailsFormData.getFieldProps("email")} />
                                                {userDetailsFormData.touched.email &&
                                                    userDetailsFormData.errors.email
                                                    ? renderError(userDetailsFormData.errors.email)
                                                    : null}
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="form-group" >
                                            <div className="from-control-icon">
                                                <Select
                                                    options={countryCodeDropDownData}
                                                    placeholder={<div>Select Country Code*</div>}
                                                    onChange={(selectedOption) => { userDetailsFormData.setFieldValue("countryCode", selectedOption?.value); }}
                                                    value={countryCodeDropDownData?.filter(({ value }) => {
                                                        return (
                                                            value ===
                                                            userDetailsFormData.values.countryCode
                                                        );
                                                    })}
                                                    onBlur={() => { userDetailsFormData.setFieldTouched("countryCode", true) }}
                                                    isClearable
                                                    menuPosition="fixed"
                                                    className="react-select-container"
                                                />
                                                {userDetailsFormData.touched.countryCode &&
                                                    userDetailsFormData.errors.countryCode
                                                    ? renderError(userDetailsFormData.errors.countryCode)
                                                    : null}

                                            </div>
                                        </Form.Group>
                                        <Form.Group className="form-group" >
                                            <div className="from-control-icon">
                                                <i className="control-icon bi bi-telephone"></i>
                                                <Form.Control type="text" placeholder="Mobile No" {...userDetailsFormData.getFieldProps("mobileNo")} />
                                                {userDetailsFormData.touched.mobileNo &&
                                                    userDetailsFormData.errors.mobileNo
                                                    ? renderError(userDetailsFormData.errors.mobileNo)
                                                    : null}
                                            </div>
                                        </Form.Group>
                                        {/* <Form.Group className="form-group" >
                                            <div className="from-control-icon">
                                                <i className="control-icon bi bi-lock"></i>
                                                <Form.Control type="password" placeholder="Password" />
                                                <button className='password-eye'>
                                                    <i className="bi bi-eye d-none"></i>
                                                    <i className="bi bi-eye-slash"></i>
                                                </button>
                                            </div>
                                        </Form.Group> */}

                                        <div className="form-group-captcha">
                                            <div className="captcha-control captcha-image">
                                                {
                                                    !isNullUndefinedOrBlank(captchaImgUrl) &&
                                                    <img src={captchaImgUrl} alt="" />
                                                }
                                                {/* <button className=' btn-sm' onClick={()=>{handleRegenerateCaptcha();}}>Regenerate</button> */}
                                            </div>

                                            <Form.Group className="captcha-control captcha-input form-group" >
                                                <Form.Control type="text" placeholder="Your Captcha" {...userDetailsFormData.getFieldProps("hiddenCaptcha")} />
                                                {userDetailsFormData.touched.hiddenCaptcha &&
                                                    userDetailsFormData.errors.hiddenCaptcha
                                                    ? renderError(userDetailsFormData.errors.hiddenCaptcha)
                                                    : null}
                                            </Form.Group>
                                        </div>
                                        <button type="button" className=' btn-link btn-sm' onClick={() => { handleRegenerateCaptcha(); }}>Regenerate</button>
                                        <div className="auth-btn-group">
                                            <Button variant="primary" onClick={() => { handleUserDetailsSubmit() }}>Continue</Button>
                                            <Button variant="outline-secondary" className='btn-icon-start'> <img src={google} alt="" /> Google</Button>
                                        </div>
                                        <div className="sign-up-link">
                                            <p className='text-center' onClick={() => { navigateToRelatedScreen(ENUMFORROUTES.LOGIN) }}>Already have an account?Sign In</p>
                                        </div>
                                    </Form>
                                </div>
                            }
                        </div>
                        {
                            signUpStep === ENUMFORSIGNUPSTEP.VERIFY_OTP &&

                            <div className="login-left-wrapper">
                                <div className="auth-bg-shape">
                                    <img src={bg_shape} alt="" />
                                </div>
                                <div className="auth-title">
                                    <img src={logo} alt="logo" />
                                    <h1>Verification</h1>
                                    <p>Enter the Verification Code send to <span>{!isNullUndefinedOrBlank(userDetailsFormData.values.email) ? userDetailsFormData.values.email : "-"}</span><a onClick={() => { changeStep(ENUMFORSIGNUPSTEP.USER_DETAILS) }}><i className="bi bi-pencil"></i></a> </p>
                                </div>
                                <div className="auth-form otp-form">

                                    <div className="form-group">
                                        <div className="otp-wrapper">
                                            <OTPInput
                                                value={userDetailsFormData.values.otp}
                                                onChange={(value) => { userDetailsFormData.setFieldValue("otp", value) }}

                                                renderInput={(props) => <input {...props} />}
                                                inputType="number"

                                                // autoFocus={true}  
                                                numInputs={6}
                                                renderSeparator={<span>-</span>}

                                            />

                                            {/* <div className='forms-otp'>
                          <p>Resend a new code in : <span>{timer}</span></p>
                          <Button variant='link' onClick={() => { handleReSendOtp() }}>Resend OTP</Button>
                        </div> */}

                                            <div className="auth-btn-group">
                                                <Button variant="primary" onClick={() => { handleVerifyAndSubmitDetails(); }}>Verify</Button>
                                            </div>
                                            <div className="sign-up-link">
                                                <p className='text-center' onClick={() => { changeStep(ENUMFORSIGNUPSTEP.USER_DETAILS) }}>Back to Sign Up</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p>Continue with email address</p> */}
                                    {/* <Form>
                                        <Form.Group className="form-group" >
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
                                            <p className='text-center' onClick={() => { changeStep(ENUMFORSIGNUPSTEP.USER_DETAILS) }}>Back to Sign Up</p>
                                        </div>
                                    </Form> */}
                                </div>
                            </div>
                        }
                    </div>
                    <div className="login-right">
                        <AuthSidebar />
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        countryPrefixData: state.genericReducer.countryPrefixData,
    };

};

const mapDispatchToProps = {
    getRegenerateCaptchaAPI,
    getGenerateCaptchaAPI,
    SignUpDataAPI,
    SendOtpDataAPI,
    getCountryPrefixAPI,
    getVerifyCaptchaAPI
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);

// export default Signup