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
  const [question, squestion] = useState(null)
  const [watting, swatting] = useState(true)
  const [selfAnswer, sselfAnswer] = useState([])
  const [wattingNext, swattingNext] = useState(false)
  const [currentGameId, scurrentGameId] = useState(false)
  const [answers, sanswers] = useState(1)
  const [remainder, sremainder] = useState(0)
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
  const getQuestion = () => {
    timer = setInterval(() => {
      util.getQuestion(playerId, res => {
        if (res.error) {
          if (res.error == 'Session ID is not an active session') {
            alert('Game over!')
            clearInterval(timer)
            util.getresults(playerId, res => {
              let tmp = "Your game result: \r\n"
              let index = 1
              tmp += selfAnswer.map(item => `${index++}. Your answer: ${item.self}, Correct answer: ${item.answer} ,Correct: ${item.correct}`).join('\r\n')
              alert(tmp)
              window.history.back()
            })
          }
        } else {
          squestion(res.question)
          if (currentGameId == res.question.content) {
            return;
          } else {
            scurrentGameId(res.question.content)
            swattingNext(false)
          }
          swatting(false)
          clearInterval(timer)
          mremainder = parseInt(res.question.timeLimit)
          let tt = setInterval(() => {
            if (mremainder < 1) {
              sremainder(mremainder)
              clearInterval(tt)
              document.getElementById('submit-btn').click()
              swattingNext(true)
            } else {
              sremainder(mremainder--)
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
      {question ? <>
        <Descriptions title={question.content + ' - Remainder: ' + remainder} bordered>
          <Descriptions.Item label="Type">{question.utl}</Descriptions.Item>
          <Descriptions.Item label="Thumbnail">
            <img style={{ width: 100 }} src={question.thumbnail} />
          </Descriptions.Item>
          <Descriptions.Item label="Score">{question.score}</Descriptions.Item>
          <Descriptions.Item label="Time Limit">{question.timeLimit}</Descriptions.Item>
          <Descriptions.Item label="Type">{question.type}</Descriptions.Item>
          <Descriptions.Item label="Options">
            {question.type === 'single' ? <>
              <Radio.Group disabled={wattingNext} onChange={e => {
                sanswers(e.target.value)
              }} value={answers}>
                <Space direction="vertical">
                  {question.option1 ? <Radio value={1}>{question.option1}</Radio> : null}
                  {question.option2 ? <Radio value={2}>{question.option2}</Radio> : null}
                  {question.option3 ? <Radio value={3}>{question.option3}</Radio> : null}
                  {question.option4 ? <Radio value={4}>{question.option4}</Radio> : null}
                  {question.option5 ? <Radio value={5}>{question.option5}</Radio> : null}
                  {question.option6 ? <Radio value={6}>{question.option6}</Radio> : null}
                </Space>
              </Radio.Group>
            </> : <></>}
          </Descriptions.Item>
        </Descriptions>
        <Button id='submit-btn' style={{ margin: '20px 0px', display: 'none' }} onClick={() => {
          let ids = []
          if (answers.length == undefined) {
            ids.push(answers)
          }
          util.submitAnswer(playerId, ids, res => {
            let ans = question.answers.split(',')
            let ansStr = ""
            ans.forEach(an => {
              ansStr += question['option' + an] + ","
            })
            let a1 = ids.map(item => question['option' + item]).join(',')
            let a2 = ansStr.substring(0, ansStr.length - 1)
            alert('Answer: ' + ansStr.substring(0, ansStr.length - 1))
            let thisQuestion = {
              self: a1,
              answer: a2,
              correct: a1 == a2 ? 'Yes' : 'No'
            }
            selfAnswer.push(thisQuestion)
            sselfAnswer(selfAnswer)
            swatting(true)
            getQuestion()
          })
        }}>Submit</Button>
      </> : null}
    </>)
}

export default Page;
