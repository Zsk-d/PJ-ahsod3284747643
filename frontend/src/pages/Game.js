import { React, useEffect, useState } from 'react';
import { Card } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Modal, Input, message, Descriptions, Radio, Space } from 'antd';

// import Util from '../util';

import Header from '../components/StationHeader'
import util from '../util';
let timer = null
let mremainder = 999999
const Page = () => {
  const [question, squestion] = useState({})
  const [watting, swatting] = useState(true)
  const [wattingNext, swattingNext] = useState(false)
  const [answers, sanswers] = useState([])
  const [remainder, sremainder] = useState(0)
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state
  let sessionId = state.sessionId
  let name = state.name
  let playerId = state.playerId
  let currentGameId = null

  const gridStyle = {
    display: 'flex',
    height: 280,
    cursor: 'pointer',
    fontSize: 21,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  };
  const getQuestion = () => {
    timer = setInterval(() => {
      util.getQuestion(playerId, res => {
        if (res.error) {

        } else {
          squestion(res.question)
          currentGameId = res.question.content
          swatting(false)
          clearInterval(timer)
          mremainder = parseInt(res.question.timeLimit)
          let tt = setInterval(() => {
            if (mremainder < 1) {
              sremainder(mremainder)
              clearInterval(tt)
            } else {
              sremainder(mremainder --)
            }
          }, 1000);
        }
      })
    }, 3 * 1000);
  }
  useEffect(() => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    getQuestion()
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
              <Radio.Group disabled={wattingNext} onChange={e => {
                sanswers(e.target.value)
              }} value={answers}>
                <Space direction="vertical">
                  {question.options.split(',').map(item => {
                    return <Radio value={question.options.split(',').indexOf(item)}>{item}</Radio>
                  })}
                </Space>
              </Radio.Group>
            </> : <></>}
          </Descriptions.Item>
        </Descriptions>
        <Button disabled={wattingNext} style={{ margin: '20px 0px' }} onClick={() => {
          debugger
          let ids = []
          if(answers.length == undefined){
            ids.push(answers)
          }
          util.submitAnswer(playerId, ids, res => {
            if (res.error) {
              // 已经是最后一个问题或者已经提交过, 等待
              swatting(false)
              getQuestion()
            } else {
              // 提交成功, 并且还有下一个问题
            }
          })
        }}>Submit</Button>
      </> : null}
    </>)
}

export default Page;
