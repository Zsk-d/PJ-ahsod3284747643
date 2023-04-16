import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Card, message } from 'antd';

// import Util from '../util';

import Header from '../components/StationHeader'
import util from '../util';

const Page = () => {
  const navigate = useNavigate()
  //   const location = useLocation()
  // const state = location.state
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (params) => {
    console.log('Success:', params);
    if (params.password !== params.repassword) {
      messageApi.error('The two passwords entered are different !');
    } else {
      const { email, password, name } = params
      util.reg({ email, password, name }, res => {
        console.log(res)
        if (res.error) {
          messageApi.error(res.error);
        } else {
          util.setLoginInfo({ token: res.token, email, name })
          messageApi.info('Success !');
          navigate('/admin-main')
        }
      })
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  const contentStyle = {
    padding: '100px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
  const [username, susername] = useState('')
  const [password, spassword] = useState('')
  const [repassword, srepassword] = useState('')
  return (
    <>
      {contextHolder}
      <Header title={'Admin Register'}></Header>
      <div style={contentStyle}>
        <Card>
          <Form
            name="basic"
            labelCol={{ span: 8, }}
            wrapperCol={{ span: 16, }}
            style={{ maxWidth: 600, }}
            labelAlign="left"
            initialValues={{ remember: true, }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input value={username} onChange={e => { susername(e.target.value) }} />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}
            >
              <Input value={username} onChange={e => { susername(e.target.value) }} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password value={password} onChange={e => { spassword(e.target.value) }} />
            </Form.Item>
            <Form.Item
              label="Re Password"
              name="repassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your password again!',
                },
              ]}
            >
              <Input.Password value={repassword} onChange={e => { srepassword(e.target.value) }} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>)
}

export default Page;
