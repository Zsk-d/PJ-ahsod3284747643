import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { message, Form, Button, Input, Radio } from 'antd';

import Header from '../components/StationHeader'
import util from '../util';

const Page = () => {
  const [form, sform] = useState({})
  const [option1, soption1] = useState('')
  const [option2, soption2] = useState('')
  const [option3, soption3] = useState('')
  const [option4, soption4] = useState('')
  const [option5, soption5] = useState('')
  const [option6, soption6] = useState('')
  const [thumbnail, sthumbnail] = useState('')
  const location = useLocation()
  const state = location.state
  const action = state.action
  const record = state.record
  console.log('-----< location.state.record:', record)
  const [messageApi, contextHolder] = message.useMessage();
  // const [newQuizName, snewQuizName] = useState('')
  // const [thumbnail, sthumbnail] = useState('')

  const onFinish = (values) => {
    debugger
    console.log('Success:', values);
    values.thumbnail = thumbnail
    values = { ...values, option1, option2, option3, option4, option5, option6 }
    util.updateQuizById(record.id, [...record.questions, values], null, null, res => {
      if (res.error) {
        messageApi.error(res.error)
      } else {
        messageApi.success('Success !')
        window.history.back()
      }
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const contentStyle = {
    padding: '10px'
  }
  useEffect(() => {
    if (action === 'edit') {
      const { content, type, timeLimit, score, url, option1, option2, option3, option4, option5, option6, thumbnail } = state.record.question
      sform({ content, type, timeLimit, score, url })
      soption1(option1)
      soption2(option2)
      soption3(option3)
      soption4(option4)
      soption5(option5)
      soption6(option6)
      sthumbnail(thumbnail)
    }
  }, [])
  return (
    <>
      {contextHolder}
      <Header title={'Question'} hasLogoutBtn={true}></Header>
      <div style={contentStyle}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={state.record.question}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="content"
            name="content"
            rules={[
              {
                required: true,
                message: 'Please input content!',
              },
            ]}
          >
            <Input value={form.content} onChange={e => {
              form.content = e.target.value
              sform(form)
            }} />
          </Form.Item>
          <Form.Item
            label="type"
            name="type"
            rules={[
              {
                required: true,
                message: 'Please input type!',
              },
            ]}
          >
            <Radio.Group value={form.type} onChange={(e) => {
              form.type = e.target.value
              sform(form)
            }}>
              <Radio.Button value="single">single</Radio.Button>
              <Radio.Button value="multiple">multiple</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Time limit"
            name="timeLimit"
            rules={[
              {
                required: true,
                message: 'Please input Time limit!',
              },
            ]}
          >
            <Input value={form.timeLimit} onChange={e => {
              form.timeLimit = e.target.value
              sform(form)
            }} />
          </Form.Item>
          <Form.Item
            label="Thumbnail"
            name="thumbnail">
            <img style={{ width: '100px', margin: '0px 10px' }} src={thumbnail} />
            <input id="pic" type="file" onChange={() => {
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
            }}></input>

          </Form.Item>
          <Form.Item
            label="Score"
            name="score"
            rules={[
              {
                required: true,
                message: 'Please input Score',
              },
            ]}
          >
            <Input value={form.score} onChange={e => {
              form.score = e.target.value
              sform(form)
            }} />
          </Form.Item>
          <Form.Item
            label="Url"
            name="Url"
          >
            <Input value={form.url} onChange={e => {
              form.url = e.target.value
              sform(form)
            }} />
          </Form.Item>
          <Form.Item
            label="Answers"
            name="answers"
          >
            <Input placeholder='Please sperate with ",", eg. 1,2,4' value={form.answers} onChange={e => {
              form.url = e.target.answers
              sform(form)
            }} />
          </Form.Item>
          <Form.Item
            label="Options"
            name="options"
          >
            <div style={{ display: 'inline-block' }}>1. <Input style={{ margin: '5px 5px', width: 150 }} value={option1} onChange={e => { soption1(e.target.value); }} /></div>
            <div style={{ display: 'inline-block' }}>2. <Input style={{ margin: '5px 5px', width: 150 }} value={option2} onChange={e => { soption2(e.target.value); }} /></div>
            <div style={{ display: 'inline-block' }}>3. <Input style={{ margin: '5px 5px', width: 150 }} value={option3} onChange={e => { soption3(e.target.value); }} /></div>
            <div style={{ display: 'inline-block' }}>4. <Input style={{ margin: '5px 5px', width: 150 }} value={option4} onChange={e => { soption4(e.target.value); }} /></div>
            <div style={{ display: 'inline-block' }}>5. <Input style={{ margin: '5px 5px', width: 150 }} value={option5} onChange={e => { soption5(e.target.value); }} /></div>
            <div style={{ display: 'inline-block' }}>6. <Input style={{ margin: '5px 5px', width: 150 }} value={option6} onChange={e => { soption6(e.target.value); }} /></div>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>)
}

export default Page;
