import { React, useState } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom'
import { Modal, Input, message } from 'antd';

import Header from '../components/StationHeader'
import util from '../util';
const Page = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()
  //   const location = useLocation()
  // const state = location.state
  let tmp = ''
  let username = ''
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
      {contextHolder}
      <Header title={'Home'} hideBackBtn={true}></Header>
      <Card>
        <Card.Grid onClick={() => {

          Modal.info({
            title: 'Join game',
            content: (
              <div>
                <p>Your name</p>
                <Input onChange={e => {
                  username = e.target.value
                }}></Input>
                <p>Enter session ID</p>
                <Input onChange={e => {
                  tmp = e.target.value
                }}></Input>
              </div>
            ),
            onOk() {
              util.joinBySessionid(tmp, username, res => {
                if (res.error) {
                  messageApi.error(res.error)
                } else {
                  navigate('/game', { state: { name: username, sessionId: tmp, playerId: res.playerId } })
                }
              })
            },
          });
        }} style={{ ...gridStyle, width: '100%' }}>Play Join</Card.Grid>
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
