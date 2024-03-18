import React, { useEffect, useState } from 'react'
import { RootState } from '../../../redux/store';
import { connect } from 'react-redux';
import { loading } from '../../../redux/Loader/loader.action';
import logo from '../../../assets/imgaes/verification.svg';
import captcha from '../../../assets/imgaes/captcha.png';
import google from '../../../assets/imgaes/google.svg';
import bg_shape from '../../../assets/imgaes/bg-shape.png';
import { Button, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import AuthSidebar from '../../../components/AuthSidebar/AuthSidebar';
import { useNavigate } from 'react-router';
import { DropdownListFormat, ENUMFORLOGINTAB, ENUMFORROUTES, LoginData } from '../../../interfaces/interface';
import { customJsonInclude, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank, renderError } from '../../../Utility/Helper';
import { getCountryPrefixAPI, getGenerateCaptchaAPI, getRegenerateCaptchaAPI, getVerifyCaptchaAPI } from '../../../redux/Service/generic';
import * as yup from 'yup';
import { ONLY_NUMBERS, PATTERN_EMAIL, PATTERN_FOR_PASSWORD } from '../../../Utility/Validation_Helper';
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import Select from "react-select";
import { loginToSystem } from './../../../redux/Service/login';
/**
 * Login Component
 * @param {object} props - Props passed to the component
 * @returns {JSX.Element} JSX element representing the Login component
 */
const Login = (props) => {
    const navigate = useNavigate();

    const navigateToRelatedScreen = (route: any, val?: any) => {

        if (val) {
            navigate(route, { state: val })
        }
        else {
            navigate(route)
        }

    }

    const [selectedTab, setSelctedTab] = useState<any>(ENUMFORLOGINTAB.EMAIL);
    const [eyeToggle, setEyeToggle] = useState<boolean>(false);

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
        const reqBody = { uuId: "" }
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
 * Effect hook to handle actions on component mount.
 * - Calls functions to generate captcha and fetch country prefixes.
 */
    useEffect(() => {

        setCountyCodeDropDownData(!isEmptyObjectOrNullUndefiend(props.countryPrefixData) ? props.countryPrefixData : []);
    }, [props.countryPrefixData])

    const initLoginValues: LoginData = {
        email: "",
        countryCode: "",
        password: "",
        phoneNo: "",
        type: "",
        uuid: "",
        hiddenCaptcha: "",

    }
    const validationSchemaForLoginData = yup.object({


        email: yup.string().when(
            () => {
                return selectedTab === ENUMFORLOGINTAB.EMAIL ? yup.string().trim().matches(PATTERN_EMAIL, "Please Enter a valid Email.").required("Email is required !!") : yup.string()
            }),
        password: yup.string().when(
            () => {
                return selectedTab === ENUMFORLOGINTAB.EMAIL ? yup.string().trim().matches(PATTERN_FOR_PASSWORD, "Please Enter a valid Password .").required("Password is required !!") : yup.string()
            }),
        countryCode: yup.string().when(
            () => {
                return selectedTab === ENUMFORLOGINTAB.MOBILE_NO ? yup.string().required("Country Code is required !!") : yup.string()
            }),
        phoneNo: yup.string().when(
            () => {
                return selectedTab === ENUMFORLOGINTAB.MOBILE_NO ? yup.string().trim().matches(ONLY_NUMBERS, "Please Enter Only Numerics Values!!")
                    .min(7, "Please Enter a valid Mobile No.").required("Mobile No Required!!") : yup.string();
            }),
        hiddenCaptcha: yup.string().required("Captcha is required !!")

    })

    const onSubmitForLogin = () => {
        // console.log(vallues)

    }
    const loginFormData = useFormik({
        initialValues: initLoginValues,
        validationSchema: validationSchemaForLoginData,
        onSubmit: onSubmitForLogin,
    })
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
        const loginDataResponse = await props.loginToSystem(updateBody);
        if (loginDataResponse) {
            console.log(loginDataResponse, "loginData Response");
        }



    }
    const changeTab = (tab) => {
        if (tab !== selectedTab) {
            setSelctedTab(tab);
        }
    }


    return (
        <>
            <div className="auth-wrapper">
                <div className="login-wrapper">
                    <div className="login-left">
                        <div className="login-left-wrapper ">
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
                                        <Form>
                                            <Form.Group className="form-group">
                                                <div className="from-control-icon">
                                                    <i className="control-icon bi bi-envelope"></i>
                                                    <Form.Control type="email" placeholder="Your email" {...loginFormData.getFieldProps("email")} />
                                                    {loginFormData.touched.email &&
                                                        loginFormData.errors.email
                                                        ? renderError(loginFormData.errors?.email)
                                                        : null}
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="form-group" >
                                                <div className="from-control-icon">
                                                    <i className="control-icon bi bi-lock"></i>
                                                    <Form.Control type={eyeToggle ? "text" : "password"} placeholder="Password" {...loginFormData.getFieldProps("password")} />
                                                    <button className='password-eye' onClick={() => { setEyeToggle(!eyeToggle) }}>
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

                                            <div className="form-group forgot-password">
                                                <a href='#' className=' btn-link btn-sm'>Forgot Password?</a>
                                            </div>

                                        </Form>
                                    </div>
                                </div>
                                <div className={`tab-pane fade  ${selectedTab === ENUMFORLOGINTAB.MOBILE_NO ? "show active" : ""}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="auth-form">
                                        <p>Continue with mobile number</p>
                                        <Form>
                                            <Form.Group className="form-group" >
                                                <div className="from-control-icon">
                                                    <Select
                                                        options={countryCodeDropDownData}
                                                        placeholder={<div>Select Country Code*</div>}
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
                                                    {loginFormData.touched.countryCode &&
                                                        loginFormData.errors.countryCode
                                                        ? renderError(loginFormData.errors?.countryCode as any)
                                                        : null}

                                                </div>
                                            </Form.Group>
                                            <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                                <div className="from-control-icon">
                                                    <i className="control-icon bi bi-telephone"></i>
                                                    <Form.Control type="text" placeholder="Mobile No" {...loginFormData.getFieldProps("phoneNo")} />
                                                    {loginFormData.touched.phoneNo &&
                                                        loginFormData.errors.phoneNo
                                                        ? renderError(loginFormData.errors?.phoneNo as any)
                                                        : null}
                                                </div>
                                            </Form.Group>

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
                                        <button className=' btn-link btn-sm'>Regenerate</button>
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
                                    <Button variant="primary" onClick={() => { handleSubmitLoginData() }}>Continue</Button>
                                    <Button variant="outline-secondary" className='btn-icon-start'> <img src={google} alt="" /> Google</Button>
                                </div>
                                <div className="sign-up-link">
                                    <p className='text-center' onClick={() => { navigateToRelatedScreen(ENUMFORROUTES.SIGN_UP) }} >Don’t have an account? Sign up</p>
                                </div>
                            </div>
                        </div>


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
    loading,
    getCountryPrefixAPI,
    getVerifyCaptchaAPI,
    getRegenerateCaptchaAPI,
    getGenerateCaptchaAPI,
    loginToSystem

};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login