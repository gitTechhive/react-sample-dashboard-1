import React, { useState } from 'react';
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import profile from "../../../assets/imgaes/avatar-3.jpg";

const Settings = () => {
    const [startDate, setStartDate] = useState(new Date());

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
                                        <button type="button" role="tab" aria-controls="myprofile-tab-pane" className="nav-link active">My Profile</button>
                                    </li>
                                    <li role="presentation" className="nav-item">
                                        <button type="button" role="tab" aria-controls="changepassword-tab-pane" className="nav-link" >Change Password</button>
                                    </li>

                                </ul>

                                <div id="myprofile-tab-pane" role="tabpanel" aria-labelledby="myprofile-tab" className="tab-pane fade active show">
                                    <div className="card card-settings-inner card-ribbon card-myprofile">
                                        <div className="card-header">
                                            <h4>My Profile</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="profile-container">
                                                <div className="profile-image">
                                                    <img src={profile} alt="profile" />
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
                                                        <Button variant='primary' size='sm' className='btn-icon-start'><i className='bi bi-plus'></i> Upload new picture </Button>
                                                        <Button variant='white' size='sm'>Remove</Button>
                                                    </div>


                                                    <p className='file-name'>favicon-180x180.png</p>
                                                </div>
                                            </div>
                                            <div className="">
                                                <Form className='card-form'>
                                                    <Row>
                                                        <Col md={6} >
                                                            <Form.Group className="form-group mb-3" controlId="formBasicEmail">
                                                                <Form.Label>First Name <span>*</span></Form.Label>
                                                                <Form.Control type="text" placeholder="First Name" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="form-group mb-3" controlId="formBasicPassword">
                                                                <Form.Label>Last Name <span>*</span></Form.Label>
                                                                <Form.Control type="text" placeholder="Last Name" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="form-group mb-3" controlId="formCountryCode">
                                                                <Form.Label>Country Code <span>*</span></Form.Label>
                                                                <Form.Select aria-label="Default select example">
                                                                    <option>Open this select menu</option>
                                                                    <option value="1">One</option>
                                                                    <option value="2">Two</option>
                                                                    <option value="3">Three</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="form-group mb-3" controlId="formPhoneNo">
                                                                <Form.Label>Phone No <span>*</span></Form.Label>
                                                                <Form.Control type="text" placeholder="Enter phone no." />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="form-group mb-3" controlId="formPhoneNo">
                                                                <Form.Label>Phone No <span>*</span></Form.Label>
                                                                <Form.Control type="email" placeholder="Enter email address" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12}>
                                                            <Form.Group className="form-group mb-3" controlId="formPhoneNo">
                                                                <Form.Label>Address Line</Form.Label>
                                                                <Form.Control type="text" placeholder="Enter address" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="form-group mb-3" controlId="formCountryCode">
                                                                <Form.Label>Country </Form.Label>
                                                                <Form.Select aria-label="Default select example">
                                                                    <option>Open this select menu</option>
                                                                    <option value="1">One</option>
                                                                    <option value="2">Two</option>
                                                                    <option value="3">Three</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="form-group mb-3" controlId="formCountryCode">
                                                                <Form.Label>State </Form.Label>
                                                                <Form.Select aria-label="Default select example">
                                                                    <option>Open this select menu</option>
                                                                    <option value="1">One</option>
                                                                    <option value="2">Two</option>
                                                                    <option value="3">Three</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="form-group mb-3" controlId="formCountryCode">
                                                                <Form.Label>City </Form.Label>
                                                                <Form.Select aria-label="Default select example">
                                                                    <option>Open this select menu</option>
                                                                    <option value="1">One</option>
                                                                    <option value="2">Two</option>
                                                                    <option value="3">Three</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="form-group mb-3" controlId="formPhoneNo">
                                                                <Form.Label>Zip Code</Form.Label>
                                                                <Form.Control type="text" placeholder="Enter zip code" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12}>
                                                            <Form.Group className="form-group mb-3" controlId="formPhoneNo">
                                                                <Form.Label>Bio </Form.Label>
                                                                <Form.Control as="textarea" rows={3} />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>


                                                    <Button variant="primary" size='sm' type="submit">
                                                        Save
                                                    </Button>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="changepassword-tab-pane" role="tabpanel" aria-labelledby="changepassword-tab" className="tab-pane fade active show">
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
                                                                <Form.Control type="password" />
                                                            </Form.Group>
                                                            <Form.Group className="form-group mb-3" controlId="formBasicPassword">
                                                                <Form.Label>New password <span>*</span></Form.Label>
                                                                <Form.Control type="password" />
                                                            </Form.Group>
                                                            <Form.Group className="form-group mb-3" controlId="formBasicPassword">
                                                                <Form.Label>Confirm new password <span>*</span></Form.Label>
                                                                <Form.Control type="password" />
                                                            </Form.Group>
                                                        </Col>

                                                    </Row>


                                                    <Button variant="primary" size='sm' type="submit">
                                                        Update Password
                                                    </Button>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Settings