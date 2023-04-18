import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { message, Popover, Button, Input, Space, Descriptions, } from 'antd';

import Header from '../components/StationHeader'
import util from '../util';

import copy from 'copy-to-clipboard'

const Page = () => {
  const navigate = useNavigate()
  //   const location = useLocation()
  // const state = location.state
  const [messageApi, contextHolder] = message.useMessage();
  const [quizList, squizList] = useState([])
  const [newQuizName, snewQuizName] = useState('')
  const [sessionid, ssessionid] = useState('')
  const contentStyle = {}
  useEffect(() => {
    let tmp = []
    util.getQuizList(res => {
      if (res.error) {
        messageApi.error(res.error)
      } else {
        tmp = res.quizzes
        tmp.forEach(item => {
          util.getQuizById(item.id, res => {
            if (res.error) {
              messageApi.error(res.error)
            } else {
              item.qus = res.questions
              let times = 0
              item.qus.forEach(item => {
                times += parseInt(item.timeLimit)
              })
              item.timeTotal = times
              squizList(tmp)
            }
          })
        })
      }
    })
  }, [])
  const reload = () => { window.location.reload() }
  return (
    <>
      {contextHolder}
      <Header title={'Dashboard'} hideBackBtn={true} hasLogoutBtn={true}></Header>
      <div style={contentStyle}>
        <Popover trigger={'click'} placement="right" content={
          <>
            <Input value={newQuizName} onChange={e => { snewQuizName(e.target.value) }}></Input>
            <Button style={{ margin: '10px 0px' }} onClick={() => {
              util.createQuiz(newQuizName, res => {
                if (res.error) {
                  messageApi.error(res.error)
                } else {
                  messageApi.success('Success !')
                  reload()
                }
              })
            }}>Create</Button>
          </>
        } title="Title">
          <Button style={{ margin: '10px 0px' }} type="primary">Create new game</Button>
        </Popover>
        {quizList.map(item => {
          return <Descriptions key={item.name}>
            <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
            <Descriptions.Item label="Thumbnail"><img v-show="showQR" style={{ width: 100 }} src={item.thumbnail} /></Descriptions.Item>
            <Descriptions.Item label="Number of questions">{item.qus.length}</Descriptions.Item>
            <Descriptions.Item label="Total time">{item.timeTotal} s</Descriptions.Item>
            <Descriptions.Item label="Action">
              <div>
                <Space size="middle">
                  <Popover trigger={'click'} placement="right" content={<>
                    <label>Sessionid: {sessionid}</label><Button style={{ margin: 10 }} onClick={() => {
                      copy(sessionid)
                      reload()
                     }}>copy</Button>
                  </>} title="Start">
                    {!item.active ? <Button style={{ margin: '10px 0px' }} type="primary"
                      onClick={() => {
                        util.startQuizById(item.id, res => {
                          if (res.error) {
                            messageApi.error(res.error)
                          } else {
                            util.getQuizById(item.id, res => {
                              if (res.error) {
                                messageApi.error(res.error)
                              } else {
                                ssessionid(res.active)
                                console.log('-----< res.questions11122', res)
                              }
                            })
                          }
                        })
                      }}>start</Button>
                      : null}
                  </Popover>
                  {item.active ? <Button style={{ margin: '10px 0px' }} type="primary"
                    onClick={() => {
                      util.stopQuizById(item.id, res => {
                        if (res.error) {
                          messageApi.error(res.error)
                        } else {
                          reload()
                        }
                      })
                    }}>stop</Button> : null}
                  <Button onClick={() => {
                    util.advanceQuizById(item.id, res => {
                      if (res.error) {
                        messageApi.error(res.error)
                      } else {
                        if (res.stage == item.qus.length) {
                          let results = []
                          util.getResultsBySessionid(item.active, res1 => {
                            let str = 'Game over !'
                            if (res1.results.length == 0) {
                              str += 'No one answered the question'
                            } else {
                              let questions = item.qus
                              res1.results.forEach(item1 => {
                                let name = item1.name
                                let score = 0
                                let correct = ''
                                // let correct = item1.answers.map(item2=>(item2.answerIds.join(',') == questions[questionIndex++].answers)?('Yes',score+=questions[questionIndex-1].score):'No').join(',')
                                let totalScore = 0
                                let tmp = []
                                for (let i = 0; i < item1.answers.length; i++) {
                                  if (item1.answers[i].answerIds.join(',') == questions[i].answers) {
                                    tmp.push('Yes')
                                    score += parseInt(questions[i].score)
                                  } else {
                                    tmp.push('No')
                                  }
                                  totalScore += parseInt(questions[i].score)
                                }
                                correct = tmp.join(',')

                                results.push({
                                  name,
                                  correct,
                                  score,
                                  totalScore
                                })
                              })
                            }
                            alert(str)
                            navigate('/results', { state: { results } })
                          })
                        } else {
                          reload()
                        }
                      }
                    })
                  }}>Next</Button>
                  <Button onClick={() => {
                    navigate('/quiz-main', { state: { record: item } })
                  }}>edit</Button>
                  <Button onClick={() => {
                    util.deleteQuizById(item.id, res => {
                      reload()
                    })
                  }}>delete</Button>
                </Space>
              </div>
            </Descriptions.Item>
          </Descriptions>
        })}
      </div>
    </>)
}

export default Page;
