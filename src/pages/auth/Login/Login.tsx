import React, { useEffect, useState } from 'react'
import { RootState } from '../../../redux/store';
import { connect } from 'react-redux';
import { loading } from '../../../redux/Loader/loader.action';
import verification from '../../../assets/imgaes/verification.svg';
import logo from '../../../assets/imgaes/auth-logo-small.svg';
import captcha from '../../../assets/imgaes/captcha.png';
import google from '../../../assets/imgaes/google.svg';
import bg_shape from '../../../assets/imgaes/bg-shape.png';
import { Button, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import AuthSidebar from '../../../components/AuthSidebar/AuthSidebar';
import { useNavigate } from 'react-router';
import { DropdownListFormat, ENUMFORLOGINTAB, ENUMFORROUTES, ENUMFORSIGNUPORLOGINOPTION, LoginData } from '../../../interfaces/interface';
import { customJsonInclude, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank, renderError, setToken } from '../../../Utility/Helper';
import { SendOtpDataAPI, getCountryPrefixAPI, getGenerateCaptchaAPI, getRegenerateCaptchaAPI, getVerifyCaptchaAPI } from '../../../redux/Service/generic';
import * as yup from 'yup';
import { ONLY_NUMBERS, PATTERN_EMAIL, PATTERN_FOR_PASSWORD, PATTERN_FOR_PASSWORD_NEW } from '../../../Utility/Validation_Helper';
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import Select from "react-select";
import { loginToSystem, loginWithMobileNoToSystem } from './../../../redux/Service/login';
import { GET_GOOGLE_USERS_DATA_API, SEND_OTP_TO_MOBILE_NO_DATA_API } from '../../../Utility/ApiList';
import OTPInput from 'react-otp-input';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Link } from 'react-router-dom';
/**
 * Login Component
 * @param {object} props - Props passed to the component
 * @returns {JSX.Element} JSX element representing the Login component
 */
const Login = (props) => {
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
     * State variable to store the currently selected tab in the login form.
     * Initialized with the value of `ENUMFORLOGINTAB.EMAIL` to set the email tab as the default selected tab.
     */
    const [selectedTab, setSelctedTab] = useState<any>(ENUMFORLOGINTAB.EMAIL);
    /**
 * State variable to toggle the visibility of the password input field.
 * Initialized as `false` to initially hide the password (show password as masked).
 */
    const [eyeToggle, setEyeToggle] = useState<boolean>(false);
    /**
 * State variable to control the visibility of the mobile OTP verification tab.
 * Initialized as `false` to hide the mobile OTP verification tab by default.
 */
    const [isMobileOtpVerifyTab, setIsMobileOtpVerifyTab] = useState<boolean>(false);

    /**
 * State variable to store the data for the country code dropdown.
*/
    const [countryCodeDropDownData, setCountyCodeDropDownData] = useState<Array<DropdownListFormat>>([]);

    /**
      * State variable to store the URL of the captcha image.
      */
    const [captchaImgUrl, setCaptchaImgUrl] = useState<any>("");
    /**
       * Effect hook to handle actions on component mount.
       * - Calls functions to generate captcha and fetch country prefixes.
       */
    useEffect(() => {

        handleGenerateCaptcha();
        props.getCountryPrefixAPI();
        return () => {

        }
    }, [])
    /**
     * Function to generate captcha image and set UUID in user details form data.
     */
    const handleGenerateCaptcha = async () => {
        const response = await props.getGenerateCaptchaAPI();

        if (response) {
            setCaptchaImgUrl(!isNullUndefinedOrBlank(response?.payload?.realCaptcha) ? response?.payload?.realCaptcha : "");
            loginFormData.setFieldValue("uuid", !isNullUndefinedOrBlank(response?.payload?.uuid) ? response?.payload?.uuid : "");
        }
    }
    /**
 * Function to regenerate captcha image and update UUID in user details form data.
 */
    const handleRegenerateCaptcha = async () => {
        const reqBody = { uuId: loginFormData.values.uuid }
        const response = await props.getRegenerateCaptchaAPI(reqBody);

        if (response) {
            setCaptchaImgUrl(!isNullUndefinedOrBlank(response?.payload?.realCaptcha) ? response?.payload?.realCaptcha : "");
            loginFormData.setFieldValue("uuid", !isNullUndefinedOrBlank(response?.payload?.uuid) ? response?.payload?.uuid : "");
            loginFormData.setFieldValue("hiddenCaptcha", "");
        }
    }
    /**
     * Function to verify captcha.
     * @param req Object containing UUID and captcha.
     * @returns Boolean indicating whether captcha verification was successful.
     */
    const handleVerifyCaptcha = async (req: any) => {
        const newData: LoginData = { ...req };
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
    /**
* Function to send OTP after verifying and removing unnecessary fields from the request data.
* @param req Object containing user details.
* @returns Boolean indicating whether OTP sending was successful.
*/
    const handleSendOtp = async (req) => {
        const newData: LoginData = { ...req };
        // delete newData.uuid;
        delete newData.hiddenCaptcha;
        customJsonInclude(newData);

        const response = await props.SendOtpDataAPI(SEND_OTP_TO_MOBILE_NO_DATA_API, newData);
        if (response) {

            return true;
        }
    }
    /**
 * Effect hook to handle actions on component mount.
 * - Calls functions to generate captcha and fetch country prefixes.
 */
    useEffect(() => {

        setCountyCodeDropDownData(!isEmptyObjectOrNullUndefiend(props.countryPrefixData) ? props.countryPrefixData : []);
    }, [props.countryPrefixData])

    /**
 * Initial values for the login form fields.
 */
    const initLoginValues: LoginData = {
        email: "",
        countryCode: "",
        password: "",
        phoneNo: "",
        type: "",
        uuid: "",
        hiddenCaptcha: "",

    }
    /**
 * Validation schema for login data based on the selected tab.
 */
    const validationSchemaForLoginData = yup.object({
        email: yup.string().when(
            () => {
                return selectedTab === ENUMFORLOGINTAB.EMAIL ? yup.string().trim().matches(PATTERN_EMAIL, "Please Enter a valid Email.").required("Email is required !!") : yup.string()
            }),
        password: yup.string().when(
            () => {
                return selectedTab === ENUMFORLOGINTAB.EMAIL ? yup.string().trim()
                    // .matches(PATTERN_FOR_PASSWORD, "Please Enter a valid Password .")
                    .required("Password is required !!") : yup.string()
            }),
        countryCode: yup.string().when(
            () => {
                return selectedTab === ENUMFORLOGINTAB.MOBILE_NO ? yup.string().required("Country Code is required !!") : yup.string()
            }),
        phoneNo: yup.string().when(
            () => {
                return selectedTab === ENUMFORLOGINTAB.MOBILE_NO ? yup.string().trim().matches(PATTERN_FOR_PASSWORD_NEW, "Please Enter Only Numerics Values!!")
                    .min(7, "Please Enter a valid Mobile No.").required("Mobile No Required!!") : yup.string();
            }),
        hiddenCaptcha: yup.string().required("Captcha is required !!")

    })
    /**
     * Function to handle form submission for login.
     */
    const onSubmitForLogin = () => {
        // console.log(vallues)

    }
    /**
 * Formik hook for managing login form data.
 */
    const loginFormData = useFormik({
        initialValues: initLoginValues,
        validationSchema: validationSchemaForLoginData,
        onSubmit: onSubmitForLogin,
    })

    /**
 * Function to handle submission of login data.
 * Validates the form data, verifies captcha, and performs login or OTP verification based on the selected tab.
 */
    const handleSubmitLoginData = async () => {
        loginFormData.handleSubmit();
        const loginFormErrors = await loginFormData.validateForm();
        console.log(loginFormErrors);
        if (Object.keys(loginFormErrors).length > 0) {
            loginFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(loginFormErrors, true));

            return;
        }
        const reqBody = { ...loginFormData.values };
        const verifyCaptchaResponse = await handleVerifyCaptcha(reqBody);
        if (!verifyCaptchaResponse) {
            return;
        }
        const updateBody: LoginData = { ...reqBody, type: selectedTab };
        customJsonInclude(updateBody);
        if (selectedTab === ENUMFORLOGINTAB.EMAIL) {
            const loginDataResponse = await props.loginToSystem(updateBody);
            if (loginDataResponse) {
                if (!isNullUndefinedOrBlank(loginDataResponse.payload.token)) {
                    navigateToRelatedScreen(ENUMFORROUTES.DASHBOARD);
                    setToken(loginDataResponse?.payload?.token);

                }

            }
        }
        if (selectedTab === ENUMFORLOGINTAB.MOBILE_NO) {
            const sendOtpToMobileNoResponse = await handleSendOtp(reqBody);
            if (sendOtpToMobileNoResponse) {
                if (!isNullUndefinedOrBlank(sendOtpToMobileNoResponse)) {
                    setIsMobileOtpVerifyTab(true);

                }
            }
        }



    }
    /**
     * Function to handle OTP verification and login for mobile number authentication.
     * Validates the form data, sends the OTP, and performs login upon successful OTP verification.
     */
    const handleVerifyOtpAndLogin = async () => {
        loginFormData.handleSubmit();
        const loginFormErrors = await loginFormData.validateForm();
        if (Object.keys(loginFormErrors).length > 0) {
            loginFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(loginFormErrors, true));

            return;
        }
        const reqBody = { ...loginFormData.values };
        customJsonInclude(reqBody);
        const response = await props.loginWithMobileNoToSystem(reqBody);
        if (response) {
            if (!isNullUndefinedOrBlank(response)) {
                navigateToRelatedScreen(ENUMFORROUTES.DASHBOARD);
                setToken(response?.payload?.token);
            }
        }
    }
    /**
 * Function to change the selected login tab.
 * Checks if the provided tab is different from the currently selected tab,
 * and updates the selected tab accordingly.
 * @param {string} tab The tab to be selected.
 */
    const changeTab = (tab) => {
        if (tab !== selectedTab) {
            setSelctedTab(tab);
        }
    }



    /**
 * Function to handle Google sign-up process.
 */
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (credentialResponse) => {

            if (!isNullUndefinedOrBlank(credentialResponse.access_token)) {
                handleGoogleWithLoginData(credentialResponse.access_token);
            }

        },
        onError: (error) => console.log('Login Failed:', error)
    })

    /**
 * Function to handle login with Google authentication data.
 * Retrieves user data from Google using the provided access token,
 * and performs login with the obtained user data.
 * @param {string} access_token Access token for Google authentication.
 */
    const handleGoogleWithLoginData = async (access_token) => {
        axios
            .get(`${GET_GOOGLE_USERS_DATA_API}${access_token}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    Accept: 'application/json'
                }
            })
            .then(async (res) => {
                if (!isEmptyObjectOrNullUndefiend(res?.data)) {
                    const reqBody = {
                        firstName: res?.data?.given_name,
                        lastName: res?.data?.family_name,
                        email: res?.data?.email,
                        googleId: res?.data?.id,
                        type: ENUMFORSIGNUPORLOGINOPTION.GOOGLE,

                    }
                    const response = await props.loginToSystem(reqBody);
                    if (response) {
                        if (!isNullUndefinedOrBlank(response.payload.token)) {
                            navigateToRelatedScreen(ENUMFORROUTES.DASHBOARD);

                        }
                    }
                }
            })
            .catch((err) => console.log(err));
    }
    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-wrapper">
                    <div className="auth-left">
                        {
                            !isMobileOtpVerifyTab ?
                                <div className="auth-left-wrapper ">
                                    <div className="auth-bg-shape">
                                        <img src={bg_shape} alt="" />
                                    </div>
                                    <div className="auth-title">
                                        <img src={logo} alt="logo" />
                                        <h1>Welcome Back</h1>
                                    </div>
                                    <div className="nav-tabs-auth">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" id="email" role="presentation" onClick={() => { changeTab(ENUMFORLOGINTAB.EMAIL) }} >
                                                <button className={`nav-link ${selectedTab === ENUMFORLOGINTAB.EMAIL ? "active" : ""}`} id="home-tab" data-bs-toggle="tab" type="button" role="tab"><i className="bi bi-envelope-fill"></i>Email</button>
                                            </li>
                                            <li className="nav-item" id="mobile-no" role="presentation" onClick={() => { changeTab(ENUMFORLOGINTAB.MOBILE_NO) }}>
                                                <button className={`nav-link ${selectedTab === ENUMFORLOGINTAB.MOBILE_NO ? "active" : ""}`} id="profile-tab" type="button" role="tab"><i className="bi bi-telephone-fill" ></i>Mobile</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-content" id="myTabContent">
                                        <div className={`tab-pane fade  ${selectedTab === ENUMFORLOGINTAB.EMAIL ? "show active" : ""}`} id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="auth-form">
                                                <p>Continue with email address</p>



                                                <Form.Group className="form-group">
                                                    <div className="from-control-icon">
                                                        <i className="control-icon bi bi-envelope"></i>
                                                        <Form.Control type="email" placeholder="Your email" {...loginFormData.getFieldProps("email")} />
                                                    </div>
                                                    {loginFormData.touched.email &&
                                                        loginFormData.errors.email
                                                        ? renderError(loginFormData.errors?.email)
                                                        : null}
                                                </Form.Group>
                                                <Form.Group className="form-group" >
                                                    <div className="from-control-icon">
                                                        <i className="control-icon bi bi-lock"></i>
                                                        <Form.Control type={eyeToggle ? "text" : "password"} placeholder="Password" {...loginFormData.getFieldProps("password")} />
                                                        <button className='password-eye' onClick={() => { setEyeToggle(!eyeToggle) }} type="button" >
                                                            {
                                                                eyeToggle ?
                                                                    <i className="bi bi-eye "></i>
                                                                    :
                                                                    <i className="bi bi-eye-slash"></i>
                                                            }
                                                        </button>
                                                    </div>
                                                    {loginFormData.touched.password &&
                                                        loginFormData.errors.password
                                                        ? renderError(loginFormData.errors?.password)
                                                        : null}
                                                </Form.Group>

                                                <div className="form-group forgot-password" >
                                                    {/* <button type='button' onClick={() => { navigateToRelatedScreen(ENUMFORROUTES.FORGOT_PASSWORD) }}>Forgot Password?</button> */}
                                                    <Link className='btn-link btn-sm' to={ENUMFORROUTES.FORGOT_PASSWORD}>
                                                        Forgot Password ?
                                                    </Link>

                                                </div>


                                            </div>
                                        </div>
                                        <div className={`tab-pane fade  ${selectedTab === ENUMFORLOGINTAB.MOBILE_NO ? "show active" : ""}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <div className="auth-form">
                                                <p>Continue with mobile number</p>
                                                <Form>

                                                    <div className='mobile-number'>
                                                        <Form.Group className="form-group form-group-country-code" >
                                                            <div className="from-control-icon">
                                                                <Select
                                                                    options={countryCodeDropDownData}
                                                                    placeholder={<div>Country Code*</div>}
                                                                    onChange={(selectedOption) => { loginFormData.setFieldValue("countryCode", selectedOption?.value); }}
                                                                    value={countryCodeDropDownData?.filter(({ value }) => {
                                                                        return (
                                                                            value ===
                                                                            loginFormData.values.countryCode
                                                                        );
                                                                    })}
                                                                    onBlur={() => { loginFormData.setFieldTouched("countryCode", true) }}
                                                                    isClearable
                                                                    menuPosition="fixed"
                                                                    className="react-select-container"
                                                                />

                                                            </div>
                                                            {loginFormData.touched.countryCode &&
                                                                loginFormData.errors.countryCode
                                                                ? renderError(loginFormData.errors?.countryCode as any)
                                                                : null}
                                                        </Form.Group>

                                                        <Form.Group className="form-group form-group-mobile-number" controlId="exampleForm.ControlInput1">
                                                            <div className="from-control-icon">
                                                                <i className="control-icon bi bi-telephone"></i>
                                                                <Form.Control type="text" placeholder="Mobile No" {...loginFormData.getFieldProps("phoneNo")} />
                                                            </div>
                                                            {loginFormData.touched.phoneNo &&
                                                                loginFormData.errors.phoneNo
                                                                ? renderError(loginFormData.errors?.phoneNo as any)
                                                                : null}
                                                        </Form.Group>
                                                    </div>

                                                    {/* <div className="auth-btn-group">
                                                <Button variant="primary">Continue</Button>
                                                <Button variant="outline-secondary" className='btn-icon-start'> <img src={google} alt="" /> Google</Button>
                                            </div>
                                            <div className="sign-up-link">
                                                <p className='text-center' onClick={() => { navigateToRelatedScreen(ENUMFORROUTES.SIGN_UP) }} >Don’t have an account? Sign up</p>
                                            </div> */}
                                                </Form>
                                            </div>
                                        </div>


                                        <div className="form-group-captcha">
                                            <div className="captcha-control captcha-image">
                                                {
                                                    !isNullUndefinedOrBlank(captchaImgUrl) &&
                                                    <img src={captchaImgUrl} alt="" />
                                                }
                                                <button className=' btn-link btn-sm' onClick={() => { handleRegenerateCaptcha(); }} type="button" >Regenerate</button>
                                            </div>
                                            <Form.Group className="captcha-control captcha-input form-group" >
                                                <Form.Control type="text" placeholder="Your Captcha" {...loginFormData.getFieldProps("hiddenCaptcha")} />
                                                {loginFormData.touched.hiddenCaptcha &&
                                                    loginFormData.errors.hiddenCaptcha
                                                    ? renderError(loginFormData.errors?.hiddenCaptcha as any)
                                                    : null}
                                                {/* <button className='btn btn-primary btn-sm'>Verify</button> */}
                                            </Form.Group>
                                        </div>


                                        <div className="auth-btn-group">
                                            <Button variant="primary" onClick={() => { handleSubmitLoginData() }}  >Continue</Button>
                                            <Button variant="outline-secondary" className='btn-icon-start' onClick={() => { handleGoogleLogin(); }}  > <img src={google} alt="" /> Google</Button>
                                        </div>
                                        <div className="sign-up-link">
                                            {/* <p className='text-center' onClick={() => { navigateToRelatedScreen(ENUMFORROUTES.SIGN_UP) }} >Don’t have an account? Sign up</p> */}
                                            <p className='text-center'>Don’t have an account? <Link to="/sign-up" className="text-primary">
                                                Sign up
                                            </Link></p>

                                        </div>
                                    </div>
                                </div> :

                                <div className="auth-left-wrapper">
                                    <div className="auth-bg-shape">
                                        <img src={bg_shape} alt="" />
                                    </div>
                                    <div className="auth-title">
                                        <img src={logo} alt="logo" />
                                        <h1>Verification</h1>
                                        <p>Enter the Verification Code send to <span>{ }</span><a onClick={() => { setIsMobileOtpVerifyTab(false); handleRegenerateCaptcha(); }}><i className="bi bi-pencil"></i></a> </p>
                                    </div>
                                    <div className="auth-form otp-form">

                                        <div className="form-group">
                                            {/* <div className="otp-wrapper"> */}
                                            <OTPInput
                                                value={loginFormData.values.otp}
                                                onChange={(value) => { loginFormData.setFieldValue("otp", value) }}

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
                                                <Button variant="primary" disabled={loginFormData.values.otp?.length !== 6} onClick={() => { handleVerifyOtpAndLogin(); }}>Verify</Button>
                                            </div>
                                            <div className="sign-up-link">
                                                <p className='text-center' onClick={() => { setIsMobileOtpVerifyTab(false); handleRegenerateCaptcha(); }}>Back to </p>
                                            </div>
                                            {/* </div> */}
                                        </div>

                                    </div>
                                </div>
                        }


                    </div>
                    <div className="auth-right">
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
    loading,
    getCountryPrefixAPI,
    getVerifyCaptchaAPI,
    getRegenerateCaptchaAPI,
    getGenerateCaptchaAPI,
    loginToSystem,
    SendOtpDataAPI,
    loginWithMobileNoToSystem

};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login