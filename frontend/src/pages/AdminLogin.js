import { React, useState } from 'react';
// import { useLocation } from 'react-router-dom'
import { Button, Form, Input, Card, message } from 'antd';

// import Util from '../util';

import Header from '../components/StationHeader'
import util from '../util';

const Page = () => {
  // const navigate = useNavigate()
  //   const location = useLocation()
  // const state = location.state
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (params) => {
    console.log('Success:', params)
    const { email, password } = params
    util.login({ email, password }, res => {
      console.log(res)
      if (res.error) {
        messageApi.error(res.error);
      } else {
        util.setLoginInfo({ token: res.token, email })
        messageApi.info('Success !');
      }
    })
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
  return (
    <>
      {contextHolder}
      <Header title={'Admin Login'}></Header>
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
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>)
}

export default Page;
