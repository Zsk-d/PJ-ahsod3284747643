import { React, useEffect, useState } from 'react';
import { Card } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Modal, Input, message, Descriptions, Radio, Space } from 'antd';

// import Util from '../util';

import Header from '../components/StationHeader'
import util from '../util';
let timer = null
const Page = () => {
  const [question, squestion] = useState({})
  const [watting, swatting] = useState(true)
  const [answers, sanswers] = useState([])
  const [remainder, sremainder] = useState(99999999)
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state
  let sessionId = state.sessionId
  let name = state.name
  let playerId = state.playerId

  const gridStyle = {
    display: 'flex',
    height: 280,
    cursor: 'pointer',
    fontSize: 21,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  };
  useEffect(() => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    timer = setInterval(() => {
      util.getQuestion(playerId, res => {
        if (res.error) {

        } else {
          squestion(res.question)
          swatting(false)
          clearInterval(timer)
          sremainder(parseInt(res.question.timeLimit))
          let tt = setInterval(() => {
            if (remainder <= 1) {
              clearInterval(tt)
              debugger
            } else {
              sremainder(remainder - 1)
            }
          }, 1000);
        }
      })
    }, 3 * 1000);
  }, [])
  return (
    <>
      {contextHolder}
      <Header title={'Game'}></Header>
      <div style={{ margin: 20 }}></div>
      {watting ? <><h2>Waiting for session to start...</h2></> : null}
      {!watting ? <>
        <Descriptions title={question.content + ' - Remainder: ' + remainder} bordered>
          <Descriptions.Item label="Score">{question.score}</Descriptions.Item>
          <Descriptions.Item label="Time Limit">{question.timeLimit}</Descriptions.Item>
          <Descriptions.Item label="Type">{question.type}</Descriptions.Item>
          <Descriptions.Item label="Options">
            {question.type === 'single' ? <>
              <Radio.Group onChange={e => {
                sanswers(e.target.value)
              }} value={answers}>
                <Space direction="vertical">
                  {question.options.split(',').map(item => {
                    return <Radio value={item}>{item}</Radio>
                  })}
                </Space>
              </Radio.Group>
            </> : <></>}
          </Descriptions.Item>
        </Descriptions>
        <Button style={{ margin: '20px 0px' }}>Submit</Button>
      </> : null}
    </>)
}

export default Page;
