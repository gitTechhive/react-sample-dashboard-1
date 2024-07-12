import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import profile from "../../../assets/imgaes/avatar-3.jpg";
import { ENUM_FOR_SETTING_TAB } from '../../../Utility/Enums';
import { DropdownListFormat, UserDataInterface } from '../../../interfaces/interface';
import * as yup from 'yup';
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import { isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank, renderError, SUPPORTED_FORMATS } from '../../../Utility/Helper';
import { ADDRESS_IS_REQUIRED, EMAIL_IS_REQUIRED, FIRST_NAME_IS_REQUIRED, LAST_NAME_IS_REQUIRED, MOBILE_NO_IS_REQUIRED, PLEASE_ADD_VALID_EMAIL, PLEASE_ADD_VALID_MOBILE_NO } from '../../../Utility/Validation_Message';
import { CONFIRM_PASSWORD_NOT_MATCHED, ONLY_NUMBERS, PASSWORD_INVALID, PATTERN_EMAIL, PATTERN_FOR_PASSWORD_NEW } from '../../../Utility/Validation_Helper';
import { te } from '../../../Utility/Toaster';
import { RootState } from '../../../redux/store';
import { connect } from 'react-redux';
import { getCityAPI, getCountryAPI, getCountryPrefixAPI, getStateAPI } from '../../../redux/Service/generic';
import Select from "react-select";
import { changePasswordAPI, getDataAPI, upDateDataAPI } from '../../../redux/Service/settings';
import { json } from 'body-parser';
const Settings = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [countryPhoneCodeDropDownData, setCountryPhoneCodeDropDownData] = useState<Array<DropdownListFormat>>([]);
    const [countryDropDownData, setCountryDropDownData] = useState<Array<DropdownListFormat>>([]);
    const [stateDropDownData, setStateDropDownData] = useState<Array<DropdownListFormat>>([]);
    const [cityDropDownData, setCityDropDownData] = useState<Array<DropdownListFormat>>([]);
    const [savedFormData, setSavedFormData] = useState<UserDataInterface>({} as UserDataInterface);
    // console.log(countryDropDownData)
    /**
    * handle Tab
    */
    const [selectedTab, setSelectedTab] = useState<string>(ENUM_FOR_SETTING_TAB.SETTING);
    const handleTab = (value) => {
        if (selectedTab != value) {
            setSelectedTab(value)
        }
    }

    const uploadFileRef = useRef() as any;


    const initSetting: UserDataInterface = {
        firstName: "",
        lastName: "",
        address: "",
        pinCode: "",
        mobileNo: "",
        bio: "",
        email: "",
        phonecode: "",
        country_id: "",
        state_id: "",
        cities_id: "",
        original_name: "",
        profilePicUrl: "",
        country: "",
        state: "",
        cities: ""
    }
    const onSubmitUploadFile = (values) => {
    }

    const validationSchema = yup.object({
        firstName: yup.string().trim().required(FIRST_NAME_IS_REQUIRED),
        lastName: yup.string().trim().required(LAST_NAME_IS_REQUIRED),
        address: yup.string().trim().required(ADDRESS_IS_REQUIRED),
        pinCode: yup.string().trim().nullable(),
        mobileNo: yup.string().trim().matches(ONLY_NUMBERS, PLEASE_ADD_VALID_MOBILE_NO).required(MOBILE_NO_IS_REQUIRED),
        bio: yup.string().trim().nullable(),
        email: yup.string().trim().matches(PATTERN_EMAIL, PLEASE_ADD_VALID_EMAIL).required(EMAIL_IS_REQUIRED),
        profilePic: yup.mixed().nullable().notRequired()
            .test("FILE_FORMAT", "Only upload Image file", function (value: any) {
                if (!value || value.length === 0) {
                    // No file uploaded, no error
                    return true;
                }
                // console.log(value)
                const fileType = value[0].type;
                console.log(fileType); // Log the file type for debugging
                if (!SUPPORTED_FORMATS.includes(fileType)) {
                    return this.createError({ message: "Only upload Image file" });
                }
                return true;
            }),
        profilePicUrl: yup.string().nullable()



    })

    const userProfileForm = useFormik({
        initialValues: savedFormData || initSetting,
        onSubmit: onSubmitUploadFile,
        validationSchema,
        enableReinitialize: true,
    })

    const handleUploadFile = async () => {
        userProfileForm.handleSubmit();

        const userProfileError = await userProfileForm.validateForm();
        console.log(userProfileError)
        if (Object.keys(userProfileError).length > 0) {
            userProfileForm.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(userProfileError, true))
            te("Please Upload File");
            return;

        }

        const reqBody: any = new FormData();

        console.log(userProfileForm.values.profilePic)
        if (!isEmptyObjectOrNullUndefiend(userProfileForm.values.profilePic) && typeof userProfileForm.values.profilePic === "object") {
            reqBody.append("profilePic", userProfileForm?.values?.profilePic[0]);
        }
        reqBody.append("userInfo", JSON.stringify(userProfileForm.values));
        // reqBody.append("user_info", userProfileForm.values)

        const response = await props.upDateDataAPI(reqBody);
        // console.log(response)
        if (!isNullUndefinedOrBlank(response) && !isNullUndefinedOrBlank(response.payload)) {
            // console.log(response.payload)
            if (response.payload) {

                getProfileData();
                localStorage.setItem("profile_Url", (reqBody.profilePicUrl));
            }
        }
    }

    useEffect(() => {
        if (!isEmptyObjectOrNullUndefiend(props.countryPhoneCodeData)) {
            setCountryPhoneCodeDropDownData(props.countryPhoneCodeData);
        }
        else {
            setCountryPhoneCodeDropDownData([]);
        }
    }, [props.countryPhoneCodeData]);
    // console.log(errors)
    useEffect(() => {
        if (isNullUndefinedOrBlank(userProfileForm.errors.profilePic)) {
            if (!isEmptyObjectOrNullUndefiend(userProfileForm.values.profilePic) && typeof userProfileForm.values.profilePic === "object" && userProfileForm.values.profilePic.length > 0) {
                console.log(userProfileForm.values.profilePic, "hjk")
                // userProfileForm.setFieldValue("profilePic", userProfileForm.values.profilePic as any);
                userProfileForm.setFieldValue("profilePicUrl", URL.createObjectURL(userProfileForm.values.profilePic[0]) as any);

            }
        }
        return () => {
        }
    }, [userProfileForm?.values?.profilePic])
    const handleGetStateData = async (CountryId) => {
        const reqBody = {
            country_id: CountryId
        }
        const response = await props.getStateAPI(reqBody);
        if (response) {
            setStateDropDownData(response.payload);
        }
    }

    const handleGetCityData = async (StateId) => {
        const reqBody = {
            state_id: StateId
        }
        const response = await props.getCityAPI(reqBody);
        if (response) {
            setCityDropDownData(response.payload);
        }
    }
    const getProfileData = async () => {
        let response = await props?.getDataAPI();
        // console.log(response)
    }
    useEffect(() => {
        getProfileData();
    }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {

            props.getCountryAPI();
            props.getCountryPrefixAPI();

        }, 100);

        return () => clearTimeout(delayDebounceFn);
    }, []);
    useEffect(() => {
        if (!isEmptyObjectOrNullUndefiend(props.countryData)) {
            setCountryDropDownData(props.countryData);
        }
        else {
            setCountryDropDownData([]);
        }
    }, [props.countryData]);
    useEffect(() => {
        if (!isNullUndefinedOrBlank(userProfileForm.values.country_id)) {

            handleGetStateData(userProfileForm.values.country_id);
        }

    }, [userProfileForm.values.country_id])
    useEffect(() => {
        if (!isNullUndefinedOrBlank(userProfileForm.values.state_id)) {

            handleGetCityData(userProfileForm.values.state_id);
        }

    }, [userProfileForm.values.state_id]);
    // console.log(props.profileData)
    useEffect(() => {

        if (!isNullUndefinedOrBlank(props.profileData)) {
            // setSavedFormData({ ...props.profileData.data , birth_date: !isNullUndefinedOrBlank(props.profileData.data.birth_date) ? new Date(convertlocaltoUTC(props.profileData.data?.birth_date)) : null, anniversary_date: !isNullUndefinedOrBlank(props.profileData.data.anniversary_date) ? new Date(convertlocaltoUTC(props.profileData.data.anniversary_date)) : null });
            setSavedFormData({ ...props.profileData });
            // console.log(props.profileData)
            if (!isNullUndefinedOrBlank(props.profileData.profilePicUrl)) {
                console.log("hello")
                userProfileForm.setFieldValue("profilePicUrl", props.profileData.profilePicUrl);
                localStorage.setItem("profile_Url", (props.profileData.profilePicUrl));
            }
            else {
                console.log("hello2")
                userProfileForm.setFieldValue("profilePicUrl", "");
                localStorage.removeItem("profile_Url");
            }
            if (!isNullUndefinedOrBlank(props.profileData.email)) {
                // localStorage.setItem("email", encrypted(props.profileData.data.email));
                localStorage.setItem("email", props.profileData.email);
            }
            if (!isNullUndefinedOrBlank(props.profileData.mobileNo)) {
                // localStorage.setItem("mobile_no", encrypted(props.profileData.data.mobile_no));
                localStorage.setItem("mobile_no", props.profileData.mobileNo);
            }
            if (!isNullUndefinedOrBlank(props.profileData.firstName) && !isNullUndefinedOrBlank(props.profileData.lastName)) {
                // localStorage.setItem("name", encrypted(props.profileData.data.first_name + ' ' + props.profileData.data.last_name));
                localStorage.setItem("name", (props.profileData.firstName + ' ' + props.profileData.lastName));
            }

        }
        else {
            setSavedFormData(initSetting);
        }
    }, [props.profileData])




    /* ----------------------------------------------change password---------------------------------------- */
    const initPasswordSettingsValues: any = {
        oldPassword: "",
        newPassword: "",
        confirm_password: ""
    }
    const onSubmit = (values) => {
    }

    const validationSchemaChangePass = yup.object({
        oldPassword: yup
            .string()
            .trim()
            .required("Password is Required!!"),
        newPassword: yup
            .string()
            .required("New Password is Required!!")
            .notOneOf([yup.ref("old_password"), null], "New password must be different from current password")
            .trim()
            .matches(PATTERN_FOR_PASSWORD_NEW, `${PASSWORD_INVALID}`),

        confirm_password: yup
            .string().when('new_password', ([new_password]) => {
                return new_password?.length > 0 ? yup.string().required(" Confirm Password Is Required!!").oneOf([yup.ref("new_password")], `${CONFIRM_PASSWORD_NOT_MATCHED}`) : yup.string()

            })

        // .oneOf([yup.ref("new_password"), null], `${CONFIRM_PASSWORD_NOT_MATCHED}`)
        // .when("new_password", {
        //     is: (val) => val?.length > 0,
        //     then: yup.string().required(" Confirm Password Is Required!!"),
        // })
        ,
    })
    const passwordSettingsFormData = useFormik({
        initialValues: initPasswordSettingsValues,
        onSubmit,
        validationSchema: validationSchemaChangePass,
    });

    const handleChangePassword = async () => {
        passwordSettingsFormData.handleSubmit();
        const changPasswordErrors = await passwordSettingsFormData.validateForm();
        console.log(changPasswordErrors)
        if (Object.keys(changPasswordErrors).length > 0) {
            passwordSettingsFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(changPasswordErrors, true));

            return;
        }
        const reqBody = { ...passwordSettingsFormData.values };
        delete reqBody.confirm_password;

        const response = await props.changePasswordAPI(reqBody);
        console.log(response)
        if (response) {
            passwordSettingsFormData.resetForm();
        }
    }
    return (
        <>
            <div className="page-content">
                <div className="page-title-container">
                    <div className="page-title-left">
                        <h6>Settings</h6>
                    </div>
                    <div className="page-title-right">

                    </div>
                </div>
                <div className="content-area">
                    <div className="settings-container">
                        <div className="card card-settings">
                            <div className="card-body">
                                <ul id="myTab" role="tablist" className="nav nav-tabs">
                                    <li role="presentation" className="nav-item">
                                        <button type="button" role="tab" aria-controls="myprofile-tab-pane" className={`nav-link ${selectedTab === ENUM_FOR_SETTING_TAB.SETTING ? "active" : ""} `} onClick={() => { handleTab(ENUM_FOR_SETTING_TAB.SETTING) }}>My Profile</button>
                                    </li>
                                    <li role="presentation" className="nav-item">
                                        <button type="button" role="tab" aria-controls="changepassword-tab-pane" className={`nav-link ${selectedTab === ENUM_FOR_SETTING_TAB.CHANGE_PASSWORD ? "active" : ""} `} onClick={() => { handleTab(ENUM_FOR_SETTING_TAB.CHANGE_PASSWORD) }}>Change Password</button>
                                    </li>

                                </ul>
                                {
                                    selectedTab === ENUM_FOR_SETTING_TAB.SETTING && (
                                        <div id="myprofile-tab-pane" role="tabpanel" aria-labelledby="myprofile-tab" className={`tab-pane fade ${selectedTab === ENUM_FOR_SETTING_TAB.SETTING ? 'active show' : ""}`}>
                                            <div className="card card-settings-inner card-ribbon card-myprofile">
                                                <div className="card-header">
                                                    <h4>My Profile</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="profile-container">
                                                        <div className="profile-image">
                                                            <img src={!isNullUndefinedOrBlank(userProfileForm.values.profilePicUrl) ? userProfileForm.values.profilePicUrl : profile} alt="profile" />
                                                        </div>
                                                        <div className="profile-content">
                                                            <h6>Profile</h6>
                                                            <p>Update your profile picture
                                                                <OverlayTrigger
                                                                    trigger={["hover", "hover"]}
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip>Maximum File Size 5 MB.
                                                                            only JPG JPEG and PNG
                                                                            images allowed</Tooltip>
                                                                    }
                                                                >

                                                                    <i className='bi bi-info-circle-fill ms-1'></i>
                                                                </OverlayTrigger>

                                                            </p>
                                                            <div className="button-group mt-2 mb-2">
                                                                <div className="input-file-btn">
                                                                    <Button variant='primary' size='sm' className='btn-icon-start'><i className='bi bi-plus'></i> Upload new picture </Button>
                                                                    <input type="file"
                                                                        onChange={(e) => { !isEmptyObjectOrNullUndefiend(e.target?.files) && userProfileForm.setFieldValue("profilePic", e.target?.files as any) }}
                                                                        ref={uploadFileRef}
                                                                    />
                                                                </div>
                                                                {!isNullUndefinedOrBlank(userProfileForm.values.profilePicUrl) &&

                                                                    <Button variant='white' size='sm' onClick={() => {
                                                                        userProfileForm.setFieldValue("profilePic", null);
                                                                        userProfileForm.setFieldValue("profilePicUrl", null);
                                                                        uploadFileRef.current.value = null
                                                                    }}>Remove</Button>
                                                                }
                                                            </div>
                                                            <p className='file-name'>  {!isNullUndefinedOrBlank(userProfileForm?.values?.profilePic) ? userProfileForm?.values?.profilePic?.name : ""}</p>
                                                            <div> {userProfileForm.touched.profilePic &&
                                                                userProfileForm.errors.profilePic
                                                                ? renderError(userProfileForm.errors.profilePic as any)
                                                                : null}</div>
                                                        </div>

                                                    </div>

                                                    <div className="">
                                                        <Form className='card-form'>
                                                            <Row>
                                                                <Col md={6} >
                                                                    <Form.Group className="form-group mb-3" controlId="formBasicEmail">
                                                                        <Form.Label>First Name <span>*</span></Form.Label>
                                                                        <Form.Control type="text" placeholder="First Name" {...userProfileForm.getFieldProps("firstName")} />
                                                                        {userProfileForm.touched.firstName &&
                                                                            userProfileForm.errors.firstName
                                                                            ? renderError(userProfileForm.errors.firstName)
                                                                            : null}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group className="form-group mb-3" controlId="formBasicPassword">
                                                                        <Form.Label>Last Name <span>*</span></Form.Label>
                                                                        <Form.Control type="text" placeholder="Last Name" {...userProfileForm.getFieldProps("lastName")} />
                                                                        {userProfileForm.touched.lastName &&
                                                                            userProfileForm.errors.lastName
                                                                            ? renderError(userProfileForm.errors.lastName)
                                                                            : null}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group className="form-group mb-3" controlId="formCountryCode">
                                                                        <Form.Label>Country Code <span>*</span></Form.Label>
                                                                        {/* <Form.Select aria-label="Default select example">
                                                                            <option>Open this select menu</option>
                                                                            <option value="1">One</option>
                                                                            <option value="2">Two</option>
                                                                            <option value="3">Three</option>
                                                                        </Form.Select> */}

                                                                        <Select
                                                                            options={countryPhoneCodeDropDownData}
                                                                            onChange={(selectedOption) => {
                                                                                userProfileForm.setFieldValue("phonecode", selectedOption?.value);

                                                                            }}
                                                                            placeholder={<div>Select Country </div>}
                                                                            isClearable={true}
                                                                            value={countryPhoneCodeDropDownData?.filter(({ value }) => {
                                                                                return (
                                                                                    value ===
                                                                                    userProfileForm.values.phonecode
                                                                                );
                                                                            })}
                                                                            menuPosition="fixed"
                                                                            className="react-select-container"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group className="form-group mb-3" controlId="formPhoneNo">
                                                                        <Form.Label>Phone No <span>*</span></Form.Label>
                                                                        <Form.Control type="text" placeholder="Enter phone no." {...userProfileForm.getFieldProps("mobileNo")} />
                                                                        {userProfileForm.touched.mobileNo &&
                                                                            userProfileForm.errors.mobileNo
                                                                            ? renderError(userProfileForm.errors.mobileNo)
                                                                            : null}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group className="form-group mb-3" controlId="formPhoneNo">
                                                                        <Form.Label>Email <span>*</span></Form.Label>
                                                                        <Form.Control type="email" placeholder="Enter email address" {...userProfileForm.getFieldProps("email")} />
                                                                        {userProfileForm.touched.email &&
                                                                            userProfileForm.errors.email
                                                                            ? renderError(userProfileForm.errors.email)
                                                                            : null}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={12}>
                                                                    <Form.Group className="form-group mb-3" controlId="formPhoneNo">
                                                                        <Form.Label>Address Line</Form.Label>
                                                                        <Form.Control type="text" placeholder="Enter address" {...userProfileForm.getFieldProps("address")} />
                                                                        {userProfileForm.touched.address &&
                                                                            userProfileForm.errors.address
                                                                            ? renderError(userProfileForm.errors.address)
                                                                            : null}
                                                                    </Form.Group>
                                                                </Col>


                                                                <Col md={6}>
                                                                    {/* <Form.Group className="form-group mb-3" controlId="formCountryCode">
                                                                        <Form.Label>Country </Form.Label>
                                                                        <Form.Select aria-label="Default select example">
                                                                            <option>Open this select menu</option>
                                                                            <option value="1">One</option>
                                                                            <option value="2">Two</option>
                                                                            <option value="3">Three</option>
                                                                        </Form.Select>
                                                                    </Form.Group> */}
                                                                    <Form.Group className="form-group mb-3" controlId="formCountryCode">
                                                                        <Form.Label>Country </Form.Label>
                                                                        <Select
                                                                            options={countryDropDownData}
                                                                            onChange={(selectedOption) => {
                                                                                userProfileForm.setFieldValue("country_id", selectedOption?.value);
                                                                                userProfileForm.setFieldValue("state_id", null);
                                                                                userProfileForm.setFieldValue("cities_id", null);
                                                                                setStateDropDownData([]);
                                                                                setCityDropDownData([]);
                                                                            }}
                                                                            placeholder={<div>Select Country </div>}
                                                                            isClearable={true}
                                                                            value={countryDropDownData?.filter(({ value }) => {
                                                                                return (
                                                                                    value ===
                                                                                    userProfileForm.values.country_id
                                                                                );
                                                                            })}
                                                                            menuPosition="fixed"
                                                                            className="react-select-container"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group className="form-group mb-3" controlId="formCountryCode">
                                                                        <Form.Label>State </Form.Label>
                                                                        {/* <Form.Select aria-label="Default select example">
                                                                            <option>Open this select menu</option>
                                                                            <option value="1">One</option>
                                                                            <option value="2">Two</option>
                                                                            <option value="3">Three</option>
                                                                        </Form.Select> */}
                                                                        <Select
                                                                            options={stateDropDownData}
                                                                            onChange={(selectedOption) => {
                                                                                // businessFormData.setFieldValue("country", selectedOption?.value);
                                                                                userProfileForm.setFieldValue("state_id", selectedOption?.value);
                                                                                userProfileForm.setFieldValue("cities_id", null);
                                                                                setCityDropDownData([]);
                                                                            }}
                                                                            placeholder={<div>Select State </div>}
                                                                            isClearable={true}
                                                                            value={stateDropDownData?.filter(({ value }) => {
                                                                                return (
                                                                                    value ===
                                                                                    userProfileForm.values.state_id
                                                                                );
                                                                            })}
                                                                            menuPosition="fixed"
                                                                            className="react-select-container"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group className="form-group mb-3" controlId="formCountryCode">
                                                                        <Form.Label>City </Form.Label>
                                                                        {/* <Form.Select aria-label="Default select example">
                                                                            <option>Open this select menu</option>
                                                                            <option value="1">One</option>
                                                                            <option value="2">Two</option>
                                                                            <option value="3">Three</option>
                                                                        </Form.Select> */}
                                                                        <Select
                                                                            options={cityDropDownData}
                                                                            onChange={(selectedOption) => {
                                                                                // businessFormData.setFieldValue("country", selectedOption?.value);
                                                                                // businessFormData.setFieldValue("state", selectedOption?.value);
                                                                                userProfileForm.setFieldValue("cities_id", selectedOption?.value);
                                                                            }}
                                                                            placeholder={<div>Select City </div>}
                                                                            isClearable={true}
                                                                            value={cityDropDownData?.filter(({ value }) => {
                                                                                return (
                                                                                    value ===
                                                                                    userProfileForm.values.cities_id
                                                                                );
                                                                            })}
                                                                            menuPosition="fixed"
                                                                            className="react-select-container"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group className="form-group mb-3" controlId="formPhoneNo">
                                                                        <Form.Label>Zip Code</Form.Label>
                                                                        <Form.Control type="text" placeholder="Enter zip code" {...userProfileForm.getFieldProps("pinCode")} />
                                                                        {userProfileForm.touched.pinCode &&
                                                                            userProfileForm.errors.pinCode
                                                                            ? renderError(userProfileForm.errors.pinCode)
                                                                            : null}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={12}>
                                                                    <Form.Group className="form-group mb-3" controlId="formPhoneNo">
                                                                        <Form.Label>Bio </Form.Label>
                                                                        <Form.Control as="textarea" rows={3} {...userProfileForm.getFieldProps("bio")} />
                                                                        {userProfileForm.touched.bio &&
                                                                            userProfileForm.errors.bio
                                                                            ? renderError(userProfileForm.errors.bio)
                                                                            : null}
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>


                                                            <Button variant="primary" size='sm' type="button" onClick={() => { handleUploadFile() }}>
                                                                Save
                                                            </Button>
                                                        </Form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    selectedTab === ENUM_FOR_SETTING_TAB.CHANGE_PASSWORD && (
                                        <div id="changepassword-tab-pane" role="tabpanel" aria-labelledby="changepassword-tab" className={`tab-pane fade ${selectedTab === ENUM_FOR_SETTING_TAB.CHANGE_PASSWORD ? 'active show' : ""}`}>
                                            <div className="card card-settings-inner card-ribbon card-myprofile">
                                                <div className="card-header">
                                                    <h4>Change Password</h4>
                                                </div>
                                                <div className="card-body">

                                                    <div className="">
                                                        <Form className='card-form'>
                                                            <Row>
                                                                <Col md={6} >
                                                                    <Form.Group className="form-group mb-3" controlId="formBasicEmail">
                                                                        <Form.Label>Old Password <span>*</span></Form.Label>
                                                                        <Form.Control type="password" {...passwordSettingsFormData.getFieldProps("oldPassword")} />
                                                                        {passwordSettingsFormData.touched.oldPassword &&
                                                                            passwordSettingsFormData.errors.oldPassword
                                                                            ? renderError(passwordSettingsFormData.errors.oldPassword as any)
                                                                            : null}
                                                                    </Form.Group>
                                                                    <Form.Group className="form-group mb-3" controlId="formBasicPassword">
                                                                        <Form.Label>New password <span>*</span></Form.Label>
                                                                        <Form.Control type="password" {...passwordSettingsFormData.getFieldProps("newPassword")} />
                                                                        {passwordSettingsFormData.touched.newPassword &&
                                                                            passwordSettingsFormData.errors.newPassword
                                                                            ? renderError(passwordSettingsFormData.errors.newPassword as any)
                                                                            : null}
                                                                    </Form.Group>
                                                                    <Form.Group className="form-group mb-3" controlId="formBasicPassword">
                                                                        <Form.Label>Confirm new password <span>*</span></Form.Label>
                                                                        <Form.Control type="password" {...passwordSettingsFormData.getFieldProps("confirm_password")} />
                                                                        {passwordSettingsFormData.touched.confirm_password &&
                                                                            passwordSettingsFormData.errors.confirm_password
                                                                            ? renderError(passwordSettingsFormData.errors.confirm_password as any)
                                                                            : null}
                                                                    </Form.Group>
                                                                </Col>

                                                            </Row>


                                                            <Button variant="primary" size='sm' type="button" onClick={() => { handleChangePassword() }}>
                                                                Update Password
                                                            </Button>
                                                        </Form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        profileData: state.settingReducer.getData,
        countryPhoneCodeData: state.genericReducer.countryPrefixData,
        countryData: state.genericReducer.countryData,
    };

};

const mapDispatchToProps = {
    getDataAPI,
    getCountryAPI,
    getStateAPI,
    getCityAPI,
    upDateDataAPI,
    getCountryPrefixAPI,
    changePasswordAPI

};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
