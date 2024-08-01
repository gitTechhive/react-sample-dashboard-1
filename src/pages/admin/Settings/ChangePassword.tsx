import React from 'react'
import { connect } from 'react-redux'
import { changePasswordAPI } from '../../../redux/Service/settings'
import * as yup from 'yup';
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import { isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank, renderError } from '../../../Utility/Helper';

import { CONFIRM_PASSWORD_NOT_MATCHED, PASSWORD_INVALID, PATTERN_FOR_PASSWORD_NEW } from '../../../Utility/Validation_Helper';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { ENUM_FOR_SETTING_TAB } from '../../../Utility/Enums';
import { RouterOptions } from 'express';
import { RootState } from '../../../redux/store';
/**
 * Component for handling password change functionality.
 * @param {object} props - Component props containing necessary functions like `changePasswordAPI`.
 * @returns {JSX.Element} ChangePassword component JSX.
 */
export const ChangePassword = (props) => {
    console.log(props);

    /**
     * Initial values for password change form.
     * @type {object}
     */
    const initPasswordSettingsValues: any = {
        oldPassword: "",
        newPassword: "",
        confirm_password: ""
    };

    /**
     * Form submission handler.
     * @param {object} values - Form values submitted.
     */
    const onSubmit = (values) => {
        // Handle form submission logic
    };

    /**
     * Validation schema for password change form.
     * @type {object}
     */
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
    });

    /**
     * Formik hook instance for password change form.
     * @type {FormikProps} - Formik form instance with password change form data.
     */
    const passwordSettingsFormData = useFormik({
        initialValues: initPasswordSettingsValues,
        onSubmit,
        validationSchema: validationSchemaChangePass,
    });

    /**
     * Function to handle password change submission.
     */
    const handleChangePassword = async () => {
        passwordSettingsFormData.handleSubmit();
        const changePasswordErrors = await passwordSettingsFormData.validateForm();

        if (Object.keys(changePasswordErrors).length > 0) {
            passwordSettingsFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(changePasswordErrors, true));

            return;
        }

        const reqBody = { ...passwordSettingsFormData.values };
        delete reqBody.confirm_password;
        const response = await props?.changePasswordAPI(reqBody);
        if (response) {
            passwordSettingsFormData.resetForm();
        }
    };

    return (
        <div id="changepassword-tab-pane" role="tabpanel" aria-labelledby="changepassword-tab" className={`tab-pane fade ${props.selectedTab === ENUM_FOR_SETTING_TAB.CHANGE_PASSWORD ? 'active show' : ""}`}>
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

const mapStateToProps = (state: RootState) => {
    return {
    };
};

const mapDispatchToProps = {
    changePasswordAPI
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
