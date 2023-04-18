import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { message, Table, Button, Input, Space } from 'antd';

import Header from '../components/StationHeader'
import util from '../util';

const Page = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state
  const record = state.record
  console.log('-----< location.state.record:', record)
  const [messageApi, contextHolder] = message.useMessage();
  const [quizItemList, squizItemList] = useState([])
  const [newQuizName, snewQuizName] = useState('')
  const [thumbnail, sthumbnail] = useState('')

  const contentStyle = {
    padding: '10px'
  }
  useEffect(() => {
    snewQuizName(record.name)
    sthumbnail(record.thumbnail)
    util.getQuizById(record.id, res => {
      if (res.error) {
        messageApi.error(res.error)
      } else {
        console.log('-----< res.questions', res)
        squizItemList(res.questions)
      }
    })
  }, [])
  const reload = () => { window.location.reload() }
  const onFileChange = e => {
    let file = document.getElementById('pic').files[0]
    let reader = new FileReader();
    reader.readAsDataURL(file);
    let AllowImgFileSize = 2100000
    reader.onload = function (e) {
      if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
        alert('Out of size!');
        return;
      } else {
        sthumbnail(reader.result)
      }
    }
  }
  return (
    <>
      {contextHolder}
      <Header title={'Quiz'} hasLogoutBtn={true}></Header>
      <div style={contentStyle}>
        <div>
          <div style={{ display: 'inline-block' }}><label>Name: </label>
            <Input style={{ width: 200 }} value={newQuizName} onChange={e => {
              snewQuizName(e.target.value)
            }}></Input></div>
          <div style={{ display: 'inline-block' }}>
            <label style={{margin: '0px 10px'}}> Thumbnail: </label>
            {thumbnail ? <img style={{width: '100px', margin: '0px 10px'}} src={thumbnail} /> : null}
            <Input style={{width: 200}} value={thumbnail} onChange={e => {
                sthumbnail(e.target.value)
              }}/>
            <input id="pic" type="file" onChange={() => { onFileChange() }}/>
          </div>
          <Button style={{ margin: '10px 0px' }} onClick={() => {
            util.updateQuizById(record.id, null, newQuizName, thumbnail, res => {
              if (res.error) {
                messageApi.error(res.error)
              } else {
                messageApi.success('Success !')
              }
            })
          }}>Change</Button>
          <Button style={{ margin: '10px 0px' }} onClick={() => {
            navigate('/question', { state: { action: 'add', record: { id: record.id, questions: quizItemList || [] } } })
          }}>Create question</Button>
        </div>
        <Table dataSource={quizItemList} columns={[{
          title: 'content',
          dataIndex: 'content',
          key: 'title'
        }, {
          title: 'type',
          dataIndex: 'type',
          key: 'type'
        }, {
          title: 'Action',
          key: 'id',
          render: (_, _record) => (
            <Space size="middle">
              <Button onClick={() => { navigate('/question', { state: { action: 'edit', record: { id: record.id, questions: quizItemList.filter(item => item.content !== _record.content), question: _record } } }) }}>edit</Button>
              <Button onClick={() => {
                quizItemList.splice(quizItemList.indexOf(quizItemList.filter(item => item.content !== _record.content)), 1)
                util.updateQuizById(record.id, quizItemList, null, null, res => {
                  if (res.error) {
                    messageApi.error(res.error)
                  } else {
                    messageApi.success('Success !')
                    reload()
                  }
                })
              }}>delete</Button>
            </Space>
          ),
        }
        ]} />
      </div>
    </>)
}

export default Page;
