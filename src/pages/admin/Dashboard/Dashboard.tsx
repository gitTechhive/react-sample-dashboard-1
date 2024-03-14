import React from 'react'
import { ENUMFORROUTES } from '../../../interfaces/interface'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';

const Dashboard = (props) => {
  const navigate=useNavigate();
  return (
    <>
    <div>Dashboard</div>
    <h1 className='text-center'>Hello Meet</h1>
    <button onClick={()=>{navigate(ENUMFORROUTES.USER_MANGEMNET);}}>userMangement</button>
    <Button>Click Here</Button>
    </>
  )
}

export default Dashboard
