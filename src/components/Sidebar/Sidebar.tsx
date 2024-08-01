import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import logoLight from "../../assets/imgaes/auth-logo-small.svg";
import logoSm from "../../assets/imgaes/auth-logo-small.svg";
import logoDark from "../../assets/imgaes/auth-logo-small.svg";
import defaultAvatar3 from "../../assets/imgaes/avatar-3.jpg";



/**
 * Sidebar component
 */
const Sidebar = () => {
  return (
    <>

      {/* <!-- ========== App Menu ========== --> */}
      <div className="app-menu navbar-menu">
        {/* <!-- LOGO --> */}
        <div className="navbar-brand-box">
          {/* <!-- Dark Logo--> */}
          <a href="index.html" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoSm} alt="logoSm" height="48" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="logoDark" height="48" />
            </span>
          </a>
          {/* <!-- Light Logo--> */}
          <a href="index.html" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoSm} alt="logoSm" height="48" />
            </span>
            <span className="logo-lg">
              <img src={logoLight} alt="logoLight" height="48" />
            </span>
          </a>
          <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover">
            <i className="ri-record-circle-line"></i>
          </button>
        </div>

        <div id="scrollbar">
          <div className="container-fluid">

            <div id="two-column-menu">
            </div>
            <div className="navbar-sidemenu">
              <ul className="navbar-nav" id="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link menu-link" to="/dashboard">
                    <i className="bi bi-house"></i> <span data-key="t-widgets">Dashboards</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link menu-link" to="/settings">
                    <i className="bi bi-gear"></i> <span data-key="t-widgets">Settings</span>
                  </NavLink>
                </li>

              </ul>
            </div>
          </div>
          {/* <!-- Sidebar --> */}
        </div>

        <div className="sidebar-background"></div>
      </div>
      {/* <!-- Left Sidebar End --> */}

    </>
  )
}

export default Sidebar