import React, { useEffect, useState } from 'react';
import { ENUMFORROUTES } from '../../../interfaces/interface'
import { useNavigate } from 'react-router-dom'
import { Button, Dropdown, Form } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import chart1 from "../../../assets/imgaes/chart-small-1.svg";
import chart2 from "../../../assets/imgaes/chart-small-2.svg";
import chart3 from "../../../assets/imgaes/chart-small-3.svg";
import chart4 from "../../../assets/imgaes/chart-small-4.svg";
import { dashBoardAPI } from '../../../redux/Service/dashboard';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';
import Chart from 'react-apexcharts';
import { getName, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank } from '../../../Utility/Helper';
import { json } from 'stream/consumers';

import ReactApexChart from 'react-apexcharts';
/**
 * Dashboard Component
 * @returns {JSX.Element} JSX element representing the Dashboard component
 */

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState();
  const [data, setData] = useState<any>(null);
  const getData = async () => {
    let data = await props?.dashBoardAPI();
    // console.log(data)

    if (!isNullUndefinedOrBlank(data) && !isEmptyObjectOrNullUndefiend(data.payload)) {
      data?.payload?.chartData?.map((key, index) => {
        key.value = JSON.parse(key.value)
        // console.log(key.value)
      })
      setData(data.payload);
    }
    // console.log(data.payload)

  }



  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="page-content">
        <div className="dashboard-welcome">
          <div className="dashboard-welcome-left">
            <h6>Good Morning, {!isNullUndefinedOrBlank(getName()) && getName()}!</h6>
            <p>Here's what's happening with your store today.</p>
          </div>
          <div className="dashboard-welcome-right">
            <div className="date-filter">
              <div className="form-group header-input mb-0">
                {/* <DatePicker className="form-control form-control-sm" selected={startDate} onChange={(date) => setStartDate(date)} placeholder={<div>Select Date</div>}  /> */}
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
                      <h4>{!isNullUndefinedOrBlank(data?.totalCustomer) ? data?.totalCustomer : 0}

                        <span className='text-success'>{!isNullUndefinedOrBlank(data?.totalCustomerPer) ? data?.totalCustomerPer : 0}%

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
                      <h4>{!isNullUndefinedOrBlank(data?.totalMember) ? data?.totalMember : 0}

                        <span className='text-success'>{!isNullUndefinedOrBlank(data?.totalMemberPer) ? data?.totalMemberPer : 0}%

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
                      <h4>{!isNullUndefinedOrBlank(data?.activeNow) ? data?.activeNow : 0}

                        <span className='text-success'>{!isNullUndefinedOrBlank(data?.activeNowPer) ? data?.activeNowPer : 0}%

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
                      <h4>${!isNullUndefinedOrBlank(data?.myBalance) ? data?.myBalance : 0}

                        <span className='text-success'>{!isNullUndefinedOrBlank(data?.myBalancePer) ? data?.myBalancePer : 0}%

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
                    {
                      !isNullUndefinedOrBlank(data) ?
                        <Chart options={{
                          ...data?.chartData[0].value.chart,
                          chart: data?.chartData[0].value.chart,
                          xaxis: data?.chartData[0].value.xaxis,
                          stroke: data?.chartData[0].value.stroke,
                          dataLabels: data?.chartData[0].value.dataLabels,
                        }} series={data?.chartData[0]?.value?.series} type="area" height={350} />
                        :
                        <></>
                    }
                  </div>
                </div>
              </div>

              <div className="card card-ribbon card-dashboard-chart card-dashboard-left1 card-flex-layout">
                <div className="card-header">
                  <h4>Sales of Devices</h4>
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

                    {
                      !isNullUndefinedOrBlank(data) ?
                        <Chart
                          options={{
                            ...data?.chartData[1].value.chart,
                            chart: data?.chartData[1].value.chart,
                            dataLabels: data?.chartData[1].value.dataLabels,
                            fill: data?.chartData[1].value.fill,
                            legend: data?.chartData[1].value.legend,
                            plotOptions: data?.chartData[1].value.plotOptions,
                            responsive: data?.chartData[1].value.responsive,
                            xaxis: data?.chartData[1].value.xaxis
                          }}

                          series={data?.chartData[1].value.series}
                          type="bar"
                          height={350}
                        />
                        :
                        <></>
                    }
                  </div>
                </div>
              </div>

              <div className="card card-ribbon card-dashboard-chart card-dashboard-left1 card-flex-layout">
                <div className="card-header">
                  <h4>New Customer</h4>
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

                    {
                      !isNullUndefinedOrBlank(data) ?
                        <Chart
                          options={{
                            ...data?.chartData[4].value.chart,
                            chart: data?.chartData[4].value.chart,
                            dataLabels: data?.chartData[4].value.dataLabels,
                            fill: data?.chartData[4].value.fill,
                            xaxis: data?.chartData[4].value.xaxis
                          }}
                          series={data?.chartData[4].value.series}
                          type="bar"
                          height={350}
                        />
                        :
                        <></>
                    }
                  </div>
                </div>
              </div>

              {/* <div className="card card-ribbon card-dashboard-chart card-dashboard-left1 card-flex-layout">
                <div className="card-header">
                  <h4>Traffic Channel</h4>
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

                    {
                      !isNullUndefinedOrBlank(data) ?
                        <Chart
                          options={{
                            ...data[2].value.chart,
                            chart:data?.chartData[2].value.chart,
                            dataLabels: data[2].value.dataLabels,
                            fill: data[2].value.fill,
                            legend: data[2].value.legend,
                            plotOptions: data[2].value.plotOptions,
                            responsive: data[2].value.responsive,
                            xaxis: data[2].value.xaxis
                          }}

                          series={data[2].value.series}
                          type="bar"
                          height={350}
                        />
                        :
                        <></>
                    }
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="card card-ribbon card-dashboard-chart card-dashboard-right1 card-flex-layout">
                <div className="card-header">
                  <h4>Top Device</h4>
                </div>
                <div className="card-body">
                  <div className="dashboard-chart-container">

                    {
                      !isNullUndefinedOrBlank(data) ?
                        <Chart
                          options={{
                            ...data?.chartData[3].value.chart,
                            chart: data?.chartData[3].value.chart,
                            dataLabels: data?.chartData[3].value.dataLabels,
                            fill: data?.chartData[3].value.fill,
                            labels: data?.chartData[3].value.labels,
                            responsive: data?.chartData[3].value.responsive,

                          }}
                          series={data?.chartData[3].value.series}
                          type="donut"
                          height={350}
                        />
                        :
                        <></>
                    }

                  </div>
                </div>
              </div>


              <div className="card card-ribbon card-dashboard-chart card-dashboard-left1 card-flex-layout">
                <div className="card-header">
                  <h4>Top Country</h4>
                </div>
                <div className="card-body">
                  <div className="dashboard-chart-container">

                    {
                      !isNullUndefinedOrBlank(data) ?
                        <Chart
                          options={{
                            ...data?.chartData[2].value.chart,
                            chart: data?.chartData[2].value.chart,
                            dataLabels: data?.chartData[2].value.dataLabels,
                            // fill:data?.chartData[2].value.fill,
                            // legend:data?.chartData[2].value.legend,
                            plotOptions: data?.chartData[2].value.plotOptions,
                            // responsive:data?.chartData[2].value.responsive,
                            xaxis: data?.chartData[2].value.xaxis
                          }}
                          series={data?.chartData[2].value.series}
                          type="bar"
                          height={350}
                        />
                        :
                        <></>
                    }
                  </div>
                </div>
              </div>

              <div className="card card-ribbon card-dashboard-chart card-dashboard-left1 card-flex-layout">
                <div className="card-header">
                  <h4>New Customer</h4>
                </div>
                <div className="card-body">
                  <div className="dashboard-chart-container">
                    {
                      !isNullUndefinedOrBlank(data) ?
                        <Chart
                          options={{
                            ...data?.chartData[3]?.value.chart,
                            chart: data?.chartData[3]?.value.chart,
                            dataLabels: data?.chartData[3]?.value.dataLabels,
                            fill: data?.chartData[3].value?.fill,
                            labels: data?.chartData[3]?.value.labels,
                            responsive: data?.chartData[3]?.value.responsive,


                          }}
                          series={data?.chartData[3]?.value.series}
                          type="pie"
                          height={350}
                        />
                        :
                        <></>
                    }

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

const mapStateToProps = (state: RootState) => {
  return {

  };

};

const mapDispatchToProps = {
  dashBoardAPI
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

