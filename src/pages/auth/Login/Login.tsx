import React from 'react'
import { RootState } from '../../../redux/store';
import { connect } from 'react-redux';
import { loading } from '../../../redux/Loader/loader.action';
import logo from '../../../assets/imgaes/verification.svg';
import captcha from '../../../assets/imgaes/captcha.png';
import google from '../../../assets/imgaes/google.svg';
import bg_shape from '../../../assets/imgaes/bg-shape.png';
import { Button, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import AuthSidebar from '../../../components/AuthSidebar/AuthSidebar';

/**
 * Login Component
 * @param {object} props - Props passed to the component
 * @returns {JSX.Element} JSX element representing the Login component
 */
const Login = (props) => {
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
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><i className="bi bi-envelope-fill"></i>Email</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><i className="bi bi-telephone-fill"></i>Mobile</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="auth-form">
                                        <p>Continue with email address</p>
                                        <Form>
                                            <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                                <div className="from-control-icon">
                                                    <i className="control-icon bi bi-envelope"></i>
                                                    <Form.Control type="email" placeholder="Your email" />
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
                                            <div className="form-group-captcha">
                                                <div className="captcha-control captcha-image">
                                                    <img src={captcha} alt="" />
                                                    <button className=' btn-link btn-sm'>Regenerate</button>
                                                </div>
                                                <Form.Group className="captcha-control captcha-input form-group" controlId="exampleForm.ControlInput1">
                                                        <Form.Control type="text" placeholder="Your Captcha" />
                                                        <button className='btn btn-primary btn-sm'>Verify</button>
                                                </Form.Group>
                                            </div>
                                            <div className="form-group forgot-password">
                                                <a href='#' className=' btn-link btn-sm'>Forgot Password?</a>
                                            </div>     
                                            <div className="auth-btn-group">
                                                <Button variant="primary">Continue</Button>
                                                <Button variant="outline-secondary" className='btn-icon-start'> <img src={google} alt="" /> Google</Button>
                                            </div>
                                            <div className="sign-up-link">
                                                <p className='text-center'>Don’t have an account? <a href="#">Sign up</a></p>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="auth-form">
                                        <p>Continue with mobile number</p>
                                        <Form>
                                            <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                                <div className="from-control-icon">
                                                    <i className="control-icon bi bi-telephone"></i>
                                                    <Form.Control type="email" placeholder="Mobile No" />
                                                </div>
                                            </Form.Group>
                                            
                                            <div className="auth-btn-group">
                                                <Button variant="primary">Continue</Button>
                                                <Button variant="outline-secondary" className='btn-icon-start'> <img src={google} alt="" /> Google</Button>
                                            </div>
                                            <div className="sign-up-link">
                                                <p className='text-center'>Don’t have an account? <a href="#">Sign up</a></p>
                                            </div>
                                        </Form>
                                    </div>
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
    //   return { appReducer: state.loaderReducer };
};

const mapDispatchToProps = {
    loading

};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login