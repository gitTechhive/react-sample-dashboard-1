import React, { useEffect, useState } from 'react'
import logoLight from "../../assets/imgaes/logo-light.png";
import logoSm from "../../assets/imgaes/logo-sm.png";
import logoDark from "../../assets/imgaes/logo-dark.png";
import defaultAvatar3 from "../../assets/imgaes/avatar-3.jpg";

import { Form } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import { RootState } from '../../redux/store';
import { logoutFromSystem } from '../../redux/Service/login';
import { connect } from 'react-redux';
import { getName, getProfileId, getUserId, isNullUndefinedOrBlank } from '../../Utility/Helper';
import { useNavigate } from 'react-router-dom';
import { ENUMFORROUTES } from '../../interfaces/interface';
// import { profile } from 'console';
/**
 * Navbar component
 */
const Navbar = (props) => {
  const naviagate = useNavigate();
  const [SidebarSize, setSidebarSize] = useState('lg');
  const windowSize = document.documentElement.clientWidth;

  const toogleMenu = () => {
    if (windowSize > 1024) {
      setSidebarSize(SidebarSize === 'sm' ? 'lg' : 'sm');
      document.documentElement.setAttribute('data-sidebar-size', SidebarSize === 'lg' ? 'sm' : 'lg');
    }
  };

  const [profileUrl, setProfileUrl] = useState<string>(getProfileId() as any)
  const [name, setName] = useState<string>(getName() as any)
  useEffect(() => {
    if (isNullUndefinedOrBlank(props.profile)) {
      setProfileUrl(getProfileId() as any)
      setName(getName() as any)
      return;
    }
    setProfileUrl(props?.profile?.profilePicUrl)
    setName(`${props?.profile?.firstName} ${props?.profile?.lastName}`)
  }, [props.profile]);

  return (


    <header id="page-topbar">
      <div className="layout-width">
        <div className="navbar-header">
          <div className="d-flex">
            {/* <!-- LOGO --> */}
            <div className="navbar-brand-box horizontal-logo">
              <a href="index.html" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSm} alt="logoSm" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="17" />
                </span>
              </a>

              <a href="index.html" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSm} alt="logoSm" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="logoLight" height="17" />
                </span>
              </a>
            </div>

            {/* <button type="button" className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger" */}
            <button type="button" className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger " id="topnav-hamburger-icon" onClick={toogleMenu}>
              <span className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            {/* <!-- App Search--> */}
            {/* <form className="app-search d-none d-md-block">
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  className=" mr-sm-2"
                  id="search-options"
                />

                <span className="bi bi-search search-widget-icon"></span>
                <span className="bi bi-x-circle search-widget-icon search-widget-icon-close d-none"
                  id="search-close-options"></span>
              </div>

            </form> */}
          </div>

          <div className="d-flex align-items-center">

            <div className="dropdown d-md-none topbar-head-dropdown header-item">
              <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                <i className="bx bx-search fs-22"></i>
              </button>

              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown">
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      {/* <input type="text" className="form-control" placeholder="Search ..."
                        aria-label="Recipient's username"> */}
                      <Form.Control
                        type="text"
                        placeholder="Search"
                        className=" mr-sm-2"
                      />
                      <button className="btn btn-primary" type="submit"><i
                        className="mdi mdi-magnify"></i></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>











            <div className="dropdown topbar-head-dropdown ms-1 header-item" id="notificationDropdown">
              <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              >
                <i className="bi bi-bell-fill"></i>
                <span
                  className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">3<span
                    className="visually-hidden">unread messages</span></span>
              </button>
            </div>

            <div className="dropdown ms-sm-3 header-item topbar-user">
              <button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <span className="d-flex align-items-center">
                  <img className="rounded-circle header-profile-user"
                    src={!isNullUndefinedOrBlank(profileUrl) ? profileUrl : defaultAvatar3} alt="Header Avatar" />
                  <span className="text-start ms-xl-2">
                    <span className="d-none d-xl-inline-block ms-1  user-name-text">{!isNullUndefinedOrBlank(name) ? name : getName()}</span>
                    <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">Founder</span>
                  </span>
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                {/* <!-- item--> */}
                <h6 className="dropdown-header">Welcome {!isNullUndefinedOrBlank(name) ? name : getName()}!</h6>
                <a className="dropdown-item" ><i
                  className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span
                    className="align-middle" onClick={() => { naviagate(ENUMFORROUTES.SETTINGS) }}>Profile</span></a>
                <a className="dropdown-item" ><i
                  className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>
                  <span className="align-middle">Messages</span></a>
                <a className="dropdown-item" ><i
                  className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>
                  <span className="align-middle">Taskboard</span></a>
                <a className="dropdown-item" ><i
                  className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> <span
                    className="align-middle">Help</span></a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" ><i
                  className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span
                    className="align-middle">Balance : <b>$5971.67</b></span></a>
                <a className="dropdown-item" onClick={() => { naviagate(ENUMFORROUTES.SETTINGS) }}><span
                  className="badge bg-success-subtle text-success mt-1 float-end">New</span><i
                    className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span
                      className="align-middle">Settings</span></a>
                <a className="dropdown-item" href="auth-lockscreen-basic.html"><i
                  className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span
                    className="align-middle">Lock screen</span></a>
                <a className="dropdown-item" onClick={() => { props.logoutFromSystem() }}><i
                  className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                    className="align-middle" data-key="t-logout">Logout</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

  )
}
const mapStateToProps = (state: RootState) => {
  return {
    profile: state.settingReducer.getData
  };

};

const mapDispatchToProps = {
  logoutFromSystem
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
