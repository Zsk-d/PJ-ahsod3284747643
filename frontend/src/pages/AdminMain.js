import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { message, Table, Popover, Button, Input, Space } from 'antd';

import Header from '../components/StationHeader'
import util from '../util';

const Page = () => {
  const navigate = useNavigate()
  //   const location = useLocation()
  // const state = location.state
  const [messageApi, contextHolder] = message.useMessage();
  const [quizList, squizList] = useState([])
  const [newQuizName, snewQuizName] = useState('')
  const contentStyle = {
    padding: '10px'
  }
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
        <Popover placement="right" content={
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
          <Button type="primary">Create new game</Button>
        </Popover>
        <Table dataSource={quizList} columns={[{
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        }, {
          title: 'Thumbnail',
          dataIndex: 'thumbnail',
          key: 'thumbnail'
        }, {
          title: 'Number of questions',
          dataIndex: 'count',
          key: 'count'
        }, {
          title: 'Total time',
          dataIndex: 'totalTime',
          key: 'totalTime'
        }, {
          title: 'Action',
          key: 'id',
          render: (_, record) => (
            <Space size="middle">
              <Button onClick={() => {
                navigate('/quiz-main', { state: { record } })
              }}>edit</Button>
              <Button onClick={() => { }}>delete</Button>
            </Space>
          ),
        }
        ]} />
      </div>
    </>)
}

export default Page;
