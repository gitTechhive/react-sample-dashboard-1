import React from 'react'
import { RootState } from '../../../redux/store';
import { connect } from 'react-redux';
import { loading } from '../../../redux/Loader/loader.action';
import { Button, Col, Form, Row } from 'react-bootstrap';
import logo from '../../../assets/imgaes/auth-logo-small.svg';
import captcha from '../../../assets/imgaes/captcha.png';
import google from '../../../assets/imgaes/google.svg';
import bg_shape from '../../../assets/imgaes/bg-shape.png';
import AuthSidebar from '../../../components/AuthSidebar/AuthSidebar';

const Signup = (props) => {
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
                            <div className="auth-form">
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                                <div className="from-control-icon">
                                                    <i className="control-icon bi bi-person-circle"></i>
                                                    <Form.Control type="text" placeholder="First Name" />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                                <div className="from-control-icon">
                                                    <i className="control-icon bi bi-person-circle"></i>
                                                    <Form.Control type="text" placeholder="Last Name" />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                        <div className="from-control-icon">
                                            <i className="control-icon bi bi-envelope"></i>
                                            <Form.Control type="email" placeholder="Your email" />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                        <div className="from-control-icon">
                                            <i className="control-icon bi bi-telephone"></i>
                                            <Form.Control type="text" placeholder="Mobile No" />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                        <div className="from-control-icon">
                                            <i className="control-icon bi bi-lock"></i>
                                            <Form.Control type="password" placeholder="Password" />
                                            <button className='password-eye'>
                                                <i className="bi bi-eye d-none"></i>
                                                <i className="bi bi-eye-slash"></i>
                                            </button>
                                        </div>
                                    </Form.Group>
                                    
                                    <div className="auth-btn-group">
                                        <Button variant="primary">Continue</Button>
                                        <Button variant="outline-secondary" className='btn-icon-start'> <img src={google} alt="" /> Google</Button>
                                    </div>
                                    <div className="sign-up-link">
                                        <p className='text-center'>Already have an account? <a href="#">Sign In</a></p>
                                    </div>
                                </Form>
                            </div>
                        </div>

                        <div className="login-left-wrapper d-none">
                            <div className="auth-bg-shape">
                                <img src={bg_shape} alt="" />
                            </div>
                            <div className="auth-title">
                                <img src={logo} alt="logo" />
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
                            
                    </div>
                    <div className="login-right">
                        <AuthSidebar />
                    </div>
                </div>
            </div>
        </>
  )
}

export default Signup