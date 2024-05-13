import React, { useState } from 'react';
import { ENUMFORROUTES } from '../../../interfaces/interface'
import { useNavigate } from 'react-router-dom'
import { Button, Dropdown, Form } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import chart1 from "../../../assets/imgaes/chart-small-1.svg";
import chart2 from "../../../assets/imgaes/chart-small-2.svg";
import chart3 from "../../../assets/imgaes/chart-small-3.svg";
import chart4 from "../../../assets/imgaes/chart-small-4.svg";

/**
 * Dashboard Component
 * @returns {JSX.Element} JSX element representing the Dashboard component
 */

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="page-content">
        <div className="dashboard-welcome">
          <div className="dashboard-welcome-left">
            <h6>Good Morning, admin v2 Test!</h6>
            <p>Here's what's happening with your store today.</p>
          </div>
          <div className="dashboard-welcome-right">
            <div className="date-filter">
              <div className="form-group header-input mb-0">
                <DatePicker className="form-control form-control-sm" selected={startDate} onChange={(date) => setStartDate(date)} />
              </div>
              <Button variant='white' size='sm' className='btn-icon-start'><i className='bi bi-funnel'></i> Filters</Button>
            </div>
          </div>
        </div>
        <div className="content-area">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
              <div className="card card-statistics">
                <div className="card-body">
                  <div className="card-top-container">
                    <div className="card-icon">
                      <i className='bi bi-person'></i>
                    </div>
                    <h3>Total Customers</h3>
                  </div>
                  <div className="card-details-container">
                    <div className="card-details-number">
                      <h4>2,420

                        <span className='text-success'>40%

                          <i className='bi bi-arrow-up-right ms-1'></i>
                        </span>
                      </h4>
                    </div>
                    <div className="card-details-chart">
                      <img src={chart1} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
              <div className="card card-statistics">
                <div className="card-body">
                  <div className="card-top-container">
                    <div className="card-icon">
                      <i className='bi bi-person'></i>
                    </div>
                    <h3>Members</h3>
                  </div>
                  <div className="card-details-container">
                    <div className="card-details-number">
                      <h4>2,420

                        <span className='text-success'>40%

                          <i className='bi bi-arrow-up-right ms-1'></i>
                        </span>
                      </h4>
                    </div>
                    <div className="card-details-chart">
                      <img src={chart2} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
              <div className="card card-statistics">
                <div className="card-body">
                  <div className="card-top-container">
                    <div className="card-icon">
                      <i className='bi bi-person'></i>
                    </div>
                    <h3>Active Now</h3>
                  </div>
                  <div className="card-details-container">
                    <div className="card-details-number">
                      <h4>2,420

                        <span className='text-success'>40%

                          <i className='bi bi-arrow-up-right ms-1'></i>
                        </span>
                      </h4>
                    </div>
                    <div className="card-details-chart">
                      <img src={chart3} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
              <div className="card card-statistics">
                <div className="card-body">
                  <div className="card-top-container">
                    <div className="card-icon">
                      <i className='bi bi-person'></i>
                    </div>
                    <h3>
                      My Balance</h3>
                  </div>
                  <div className="card-details-container">
                    <div className="card-details-number">
                      <h4>$45k

                        <span className='text-success'>40%

                          <i className='bi bi-arrow-up-right ms-1'></i>
                        </span>
                      </h4>
                    </div>
                    <div className="card-details-chart">
                      <img src={chart4} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="card card-ribbon card-dashboard-chart card-dashboard-left1 card-flex-layout">
                <div className="card-header">
                  <h4>Active customers</h4>
                  <div className="card-header-right">
                    <Dropdown>
                      <Dropdown.Toggle size="sm" variant="white" id="dropdown-basic">
                        Last 30 days
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>Last 1 Month</Dropdown.Item>
                        <Dropdown.Item>Last 3 Month</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="card-body">
                  <div className="dashboard-chart-container">

                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="card card-ribbon card-dashboard-chart card-dashboard-right1 card-flex-layout">
                <div className="card-header">
                  <h4>Top device</h4>
                </div>
                <div className="card-body">
                  <div className="dashboard-chart-container">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
