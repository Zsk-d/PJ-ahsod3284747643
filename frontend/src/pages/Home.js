import { React } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom'
// import { Button } from 'antd';

// import Util from '../util';

import Header from '../components/StationHeader'

const Page = () => {
  const navigate = useNavigate()
  //   const location = useLocation()
  // const state = location.state
  const gridStyle = {
    display: 'flex',
    height: 280,
    cursor: 'pointer',
    fontSize: 21,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  };
  return (
    <>
    <Header title={'Home'} hideBackBtn={true}></Header>
      <Card>
        <Card.Grid onClick={() => { }} style={{ ...gridStyle, width: '100%' }}>Play Join</Card.Grid>
        <Card.Grid onClick={() => {
          navigate('/admin-login')
        }} style={{ ...gridStyle, width: '50%' }}>Admin Login</Card.Grid>
        <Card.Grid onClick={() => {
          navigate('/admin-reg')
        }} style={{ ...gridStyle, width: '50%' }}>Admin Register</Card.Grid>
      </Card>
    </>)
}

export default Page;
