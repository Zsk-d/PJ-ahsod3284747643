import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { message, Form, Button, Input, Radio } from 'antd';

import Header from '../components/StationHeader'
import util from '../util';

const Page = () => {
  const [form, sform] = useState({})
  const location = useLocation()
  const state = location.state
  const action = state.action
  const record = state.record
  console.log('-----< location.state.record:', record)
  const [messageApi, contextHolder] = message.useMessage();
  // const [newQuizName, snewQuizName] = useState('')
  // const [thumbnail, sthumbnail] = useState('')

  const onFinish = (values) => {
    console.log('Success:', values);
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
      const { content, type, timeLimit, score, url } = state.record.question
      sform({ content, type, timeLimit, score, url })
      console.log('11111111111111111111111111111')
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
            <Input value={form.answers} onChange={e => {
              form.url = e.target.answers
              sform(form)
            }} />
          </Form.Item>
          <Form.Item
            label="Options"
            name="options"
          >
            <Input style={{ margin: '5px 0px' }} value={form.options} onChange={e => { form.options = e.target.value; sform(form) }} />
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
