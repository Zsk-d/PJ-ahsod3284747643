import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { message, Popover, Button, Input, Space, Descriptions,  } from 'antd';

import Header from '../components/StationHeader'
import util from '../util';

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
    util.getQuizList(res => {
      if (res.error) {
        messageApi.error(res.error)
      } else {
        squizList(res.quizzes)
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
            <Descriptions.Item label="Thumbnail">{item.name}</Descriptions.Item>
            <Descriptions.Item label="Number of questions">{item.count}</Descriptions.Item>
            <Descriptions.Item label="Total time">{item.totalTime}</Descriptions.Item>
            <Descriptions.Item label="Action">
              <div>
                <Space size="middle">
                  <Popover trigger={'click'} placement="right" content={<>
                    <label>{sessionid}</label><Button onClick={() => { }}>copy</Button>
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
                        reload()
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
