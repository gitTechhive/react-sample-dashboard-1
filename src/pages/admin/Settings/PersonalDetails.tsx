import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { ENUM_FOR_SETTING_TAB } from '../../../Utility/Enums'
import { isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank, renderError, SUPPORTED_FORMATS } from '../../../Utility/Helper'
import { DropdownListFormat, UserDataInterface } from '../../../interfaces/interface'
import { ADDRESS_IS_REQUIRED, EMAIL_IS_REQUIRED, FIRST_NAME_IS_REQUIRED, LAST_NAME_IS_REQUIRED, MOBILE_NO_IS_REQUIRED, PLEASE_ADD_VALID_EMAIL, PLEASE_ADD_VALID_MOBILE_NO, PLEASE_SELECT_COUNTRY_CODE } from '../../../Utility/Validation_Message'
import * as yup from 'yup';
import { ONLY_NUMBERS, PATTERN_EMAIL } from '../../../Utility/Validation_Helper'
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik'
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import Select from "react-select";
import profile from "../../../assets/imgaes/avatar-3.jpg";
import { getDataAPI, upDateDataAPI } from '../../../redux/Service/settings'
import { getCityAPI, getCountryAPI, getCountryPrefixAPI, getStateAPI } from '../../../redux/Service/generic'
import { RootState } from '../../../redux/store'
/**
 * Component for managing personal details of the user.
 * Displays and updates user information including profile picture, name, address, etc.
 * @param {Object} props - Props injected by Redux state and action creators.
 * @returns {JSX.Element} JSX representation of the component.
 */
export const PersonalDetails = (props) => {
    const [countryPhoneCodeDropDownData, setCountryPhoneCodeDropDownData] = useState<Array<DropdownListFormat>>([]);
    const [countryDropDownData, setCountryDropDownData] = useState<Array<DropdownListFormat>>([]);
    const [stateDropDownData, setStateDropDownData] = useState<Array<DropdownListFormat>>([]);
    const [cityDropDownData, setCityDropDownData] = useState<Array<DropdownListFormat>>([]);
    const [savedFormData, setSavedFormData] = useState<UserDataInterface>({} as UserDataInterface);
    const uploadFileRef = useRef() as any;

    /**
     * Initial settings for user data form.
     */
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
        profilePic: null
    };

    /**
     * Handles form submission for uploading a new profile picture.
     * @param {FormikValues} values - Formik values object containing user data.
     */
    const onSubmitUploadFile = (values) => {
        // Handle form submission logic here
    };

    /**
     * Yup validation schema for user profile form fields.
     */
    const validationSchema = yup.object({
        firstName: yup.string().trim().required(FIRST_NAME_IS_REQUIRED),
        lastName: yup.string().trim().required(LAST_NAME_IS_REQUIRED),
        address: yup.string().trim().required(ADDRESS_IS_REQUIRED),
        pinCode: yup.string().trim().nullable(),
        phonecode: yup.string().trim().required(PLEASE_SELECT_COUNTRY_CODE).nullable(),
        mobileNo: yup.string().trim().matches(ONLY_NUMBERS, PLEASE_ADD_VALID_MOBILE_NO).required(MOBILE_NO_IS_REQUIRED).nullable(),
        bio: yup.string().trim().nullable(),
        email: yup.string().trim().matches(PATTERN_EMAIL, PLEASE_ADD_VALID_EMAIL).required(EMAIL_IS_REQUIRED),
        profilePic: yup.mixed().nullable().notRequired()
            .test("FILE_FORMAT", "Only upload Image file", function (value: any) {
                if (!value || value.length === 0) {
                    return true;
                }
                const fileType = value[0].type;
                if (!SUPPORTED_FORMATS.includes(fileType)) {
                    return this.createError({ message: "Only upload Image file" });
                }
                return true;
            }),
        profilePicUrl: yup.string().nullable(),
    });

    /**
     * Formik hook for managing user profile form state.
     */
    const userProfileForm = useFormik({
        initialValues: savedFormData || initSetting,
        onSubmit: onSubmitUploadFile,
        validationSchema,
        enableReinitialize: true,
    });

    /**
     * Handles the file upload event.
     */
    const handleUpdateProfile = async () => {
        userProfileForm.handleSubmit();

        const userProfileError = await userProfileForm.validateForm();

        if (Object.keys(userProfileError).length > 0) {
            userProfileForm.setTouched(
                setNestedObjectValues<FormikTouched<FormikValues>>(userProfileError, true)
            );
            return;
        }

        const reqBody: any = new FormData();
        if (!isEmptyObjectOrNullUndefiend(userProfileForm.values.profilePic) && typeof userProfileForm.values.profilePic === "object") {
            reqBody.append("profilePic", userProfileForm?.values?.profilePic[0]);
        }
        reqBody.append("userInfo", JSON.stringify(userProfileForm.values));
        const response = await props.upDateDataAPI(reqBody);
        if (!isNullUndefinedOrBlank(response) && !isNullUndefinedOrBlank(response.payload)) {
            if (response.payload) {
                getProfileData();
                localStorage.setItem("profile_Url", reqBody.profilePicUrl);
            }
        }
    };

    /**
     * Fetches user profile data.
     */
    const getProfileData = async () => {
        let response = await props?.getDataAPI();
    };

    useEffect(() => {
        getProfileData();
    }, []);

    /**
     * Effect hook to set country phone code dropdown data when props.countryPhoneCodeData changes.
     */
    useEffect(() => {
        if (!isEmptyObjectOrNullUndefiend(props.countryPhoneCodeData)) {
            setCountryPhoneCodeDropDownData(props.countryPhoneCodeData);
        } else {
            setCountryPhoneCodeDropDownData([]);
        }
    }, [props.countryPhoneCodeData]);

    /**
     * Effect hook to set profile picture URL in form values when userProfileForm.values.profilePic changes.
     */
    useEffect(() => {
        if (isNullUndefinedOrBlank(userProfileForm.errors.profilePic)) {
            if (!isEmptyObjectOrNullUndefiend(userProfileForm.values.profilePic) && typeof userProfileForm.values.profilePic === "object" && userProfileForm.values.profilePic.length > 0) {
                userProfileForm.setFieldValue("profilePicUrl", URL.createObjectURL(userProfileForm.values.profilePic[0]) as any);
            }
        }
    }, [userProfileForm?.values?.profilePic]);

    /**
     * Fetches state data based on selected country ID.
     * @param {string} CountryId - ID of the selected country.
     */
    const handleGetStateData = async (CountryId: string) => {
        const reqBody = {
            country_id: CountryId
        };
        const response = await props.getStateAPI(reqBody);
        if (response) {
            setStateDropDownData(response.payload);
        }
    };

    /**
     * Fetches city data based on selected state ID.
     * @param {string} StateId - ID of the selected state.
     */
    const handleGetCityData = async (StateId: string) => {
        const reqBody = {
            state_id: StateId
        };
        const response = await props.getCityAPI(reqBody);
        if (response) {
            setCityDropDownData(response.payload);
        }
    };

    /**
     * Effect hook to fetch initial data on component mount.
     */
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            props.getCountryAPI();
            props.getCountryPrefixAPI();
        }, 100);
        return () => clearTimeout(delayDebounceFn);
    }, []);

    /**
     * Effect hook to set country dropdown data when props.countryData changes.
     */
    useEffect(() => {
        if (!isEmptyObjectOrNullUndefiend(props.countryData)) {
            setCountryDropDownData(props.countryData);
        } else {
            setCountryDropDownData([]);
        }
    }, [props.countryData]);

    /**
     * Effect hook to handle state selection change and fetch corresponding state data.
     */
    useEffect(() => {
        if (!isNullUndefinedOrBlank(userProfileForm.values.country_id)) {
            handleGetStateData(userProfileForm.values.country_id);
        }
    }, [userProfileForm.values.country_id]);

    /**
     * Effect hook to handle city selection change and fetch corresponding city data.
     */
    useEffect(() => {
        if (!isNullUndefinedOrBlank(userProfileForm.values.state_id)) {
            handleGetCityData(userProfileForm.values.state_id);
        }
    }, [userProfileForm.values.state_id]);

    /**
     * Effect hook to update saved form data and profile picture URL when props.profileData changes.
     */
    useEffect(() => {
        if (!isNullUndefinedOrBlank(props.profileData)) {
            setSavedFormData({ ...props.profileData });
            if (!isNullUndefinedOrBlank(props.profileData.profilePicUrl)) {
                userProfileForm.setFieldValue("profilePicUrl", props.profileData.profilePicUrl);
                localStorage.setItem("profile_Url", props.profileData.profilePicUrl);
            } else {
                userProfileForm.setFieldValue("profilePicUrl", "");
                localStorage.removeItem("profile_Url");
            }
            if (!isNullUndefinedOrBlank(props.profileData.email)) {
                localStorage.setItem("email", props.profileData.email);
            }
            if (!isNullUndefinedOrBlank(props.profileData.mobileNo)) {
                localStorage.setItem("mobile_no", props.profileData.mobileNo);
            }
            if (!isNullUndefinedOrBlank(props.profileData.firstName) && !isNullUndefinedOrBlank(props.profileData.lastName)) {
                localStorage.setItem("name", `${props.profileData.firstName} ${props.profileData.lastName}`);
            }
        } else {
            setSavedFormData(initSetting);
        }
    }, [props.profileData]);


    return (
        <div id="myprofile-tab-pane" role="tabpanel" aria-labelledby="myprofile-tab" className={`tab-pane fade ${props.selectedTab === ENUM_FOR_SETTING_TAB.SETTING ? 'active show' : ""}`}>
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
                                            placeholder={<div>Select Country Code</div>}
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
                                        {userProfileForm.touched.phonecode &&
                                            userProfileForm.errors.phonecode
                                            ? renderError(userProfileForm.errors.phonecode as any)
                                            : null}
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="form-group mb-3" controlId="formPhoneNo">
                                        <Form.Label>Phone No <span>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter phone no." {...userProfileForm.getFieldProps("mobileNo")} />
                                        {userProfileForm.touched.mobileNo &&
                                            userProfileForm.errors.mobileNo
                                            ? renderError(userProfileForm.errors.mobileNo as any)
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
                                            ? renderError(userProfileForm.errors.address as any)
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
                                            ? renderError(userProfileForm.errors.pinCode as any)
                                            : null}
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="form-group mb-3" controlId="formPhoneNo">
                                        <Form.Label>Bio </Form.Label>
                                        <Form.Control as="textarea" rows={3} {...userProfileForm.getFieldProps("bio")} />
                                        {userProfileForm.touched.bio &&
                                            userProfileForm.errors.bio
                                            ? renderError(userProfileForm.errors.bio as any)
                                            : null}
                                    </Form.Group>
                                </Col>
                            </Row>


                            <Button variant="primary" size='sm' type="button" onClick={() => { handleUpdateProfile() }}>
                                Save
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    countryPhoneCodeData: state.genericReducer.countryPrefixData,
    countryData: state.genericReducer.countryData,
    profileData: state.settingReducer.getData,
}
)

const mapDispatchToProps = {
    getDataAPI,
    getCountryAPI,
    getStateAPI,
    getCityAPI,
    upDateDataAPI,
    getCountryPrefixAPI,
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails)