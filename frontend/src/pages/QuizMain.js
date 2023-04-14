import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { message, Table, Button, Input, Space } from 'antd';

import Header from '../components/StationHeader'
import util from '../util';

const Page = () => {
  // const navigate = useNavigate()
  const location = useLocation()
  const state = location.state
  const record = state.record
  console.log('-----< location.state.record:', record)
  const [messageApi, contextHolder] = message.useMessage();
  const [quizItemList, squizItemList] = useState([])
  const [newQuizName, snewQuizName] = useState('')

  const contentStyle = {
    padding: '10px'
  }
  useEffect(() => {
    snewQuizName(record.name)
    util.getQuizById(record.id, res => {
      if (res.error) {
        messageApi.error(res.error)
      } else {
        console.log('-----< res.questions', res)
        squizItemList([])
      }
    })
  }, [])
  const reload = () => { window.location.reload() }
  return (
    <>
      {contextHolder}
      <Header title={'Quiz: ' + record.name} hasLogoutBtn={true}></Header>
      <div style={contentStyle}>
        <div>
          <label>Name:</label>
          <Input style={{ width: 200 }} value={newQuizName} onChange={e => {
            snewQuizName(e.target.value)
          }}></Input>
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
        </div>
        <Table dataSource={quizItemList} columns={[{
          title: 'Title',
          dataIndex: 'title',
          key: 'title'
        }, {
          title: 'type',
          dataIndex: 'type',
          key: 'type'
        }, {
          title: 'Action',
          key: 'id',
          render: (_, record) => (
            <Space size="middle">
              <Button onClick={() => { }}>edit</Button>
              <Button onClick={() => { }}>delete</Button>
            </Space>
          ),
        }
        ]} />
      </div>
    </>)
}

export default Page;
