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
import { isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank } from '../../../Utility/Helper';
import { json } from 'stream/consumers';
import ReactApexChart from 'react-apexcharts';
/**
 * Dashboard Component
 * @returns {JSX.Element} JSX element representing the Dashboard component
 */

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState<any>(null);

  const getData = async () => {
    let data = await props?.dashBoardAPI();
    // console.log(data)

    if (!isNullUndefinedOrBlank(data) && !isEmptyObjectOrNullUndefiend(data.payload)) {
      data?.payload.map((key, index) => {
        key.value = JSON.parse(key.value)
        console.log(key.value)

      })
      setData(data.payload);
    }
    // console.log(data.payload)

  }



  useEffect(() => {
    getData()
  }, [])
  const series = [{
    name: "Product A",
    data: [44, 55, 41, 67, 22, 43, 10]
  },
  {
    name: "Product B",
    data: [13, 23, 20, 8, 13, 27, 10]
  },
  {
    name: "Product C",
    data: [11, 17, 15, 15, 21, 14, 10]
  },
  {
    name: "Product D",
    data: [21, 7, 25, 13, 22, 8, 10]
  }]


  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true
      },
      fontFamily: "Rubik",
      width: 700
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      }
    },
    xaxis: {
      type: 'category',
      categories: [
        "Dec 01",
        "Dec 02",
        "Dec 03",
        "Dec 04",
        "Dec 05",
        "Dec 06",
        "Dec 07"
      ]
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1,
      colors: [
        "#2A85FF",
        "#83BF6E",
        "#FFA114",
        "#FF6A55"
      ]
    },
    dataLabels: {
      style: {
        colors: [
          "#2A85FF",
          "#83BF6E",
          "#FFA114",
          "#FF6A55"
        ]
      }
    }
  }

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
                    {
                      !isNullUndefinedOrBlank(data) ?
                        <Chart options={data[0]?.value?.chart} series={data[0]?.value?.series} type="area" height={350} />
                        :
                        <></>
                    }
                  </div>
                </div>
              </div>

              <div className="card card-ribbon card-dashboard-chart card-dashboard-left1 card-flex-layout">
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
                            ...data[1].value.chart,
                            chart: data[1].value.chart,
                            dataLabels: data[1].value.dataLabels,
                            fill: data[1].value.fill,
                            legend: data[1].value.legend,
                            plotOptions: data[1].value.plotOptions,
                            responsive: data[1].value.responsive,
                            xaxis: data[1].value.xaxis
                          }}
                          stacked={true}
                          series={data[1].value.series}
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
                  <h4>Top Country</h4>
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
                            ...data[4].value.chart,
                            chart: data[4].value.chart,
                            dataLabels: data[4].value.dataLabels,
                            fill: data[4].value.fill,

                          }}
                          series={data[4].value.series}
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
                            chart: data[2].value.chart,
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
                            ...data[3].value.chart,
                            chart: data[3].value.chart,
                            dataLabels: data[3].value.dataLabels,
                            fill: data[3].value.fill,
                            labels: data[3].value.labels,
                            responsive: data[3].value.responsive,

                          }}
                          series={data[3].value.series}
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
                            ...data[2].value.chart,
                            chart: data[2].value.chart,
                            dataLabels: data[2].value.dataLabels,
                            // fill: data[2].value.fill,
                            // legend: data[2].value.legend,
                            plotOptions: data[2].value.plotOptions,
                            // responsive: data[2].value.responsive,
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
                            ...data[3].value.chart,
                            chart: data[3].value.chart,
                            dataLabels: data[3].value.dataLabels,
                            fill: data[3].value.fill,
                            labels: data[3].value.labels,
                            responsive: data[3].value.responsive,

                          }}
                          series={data[3].value.series}
                          type="donut"
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

