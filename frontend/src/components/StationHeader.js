import { React } from 'react';
import { Button, Layout, message } from 'antd';
import util from '../util';
const { Header } = Layout;

const StationHeader = ({ title, hideBackBtn, hasLogoutBtn }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const titleStyle = {
    fontSize: 21,
    fontWeight: 'bold'
  }
  const headerStyle = {
    height: 50,
    backgroundColor: '#f2f2f2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  return (<>{contextHolder}
    <Header style={headerStyle}>
      {title ? <label style={titleStyle}>{title}</label> : null}
      {!hideBackBtn ? <Button type='primary' onClick={() => { window.history.back() }} > Go back</Button> : <label> </label>}
      {hasLogoutBtn ? <Button type='primary' onClick={() => { util.logout(res => { if (res.error) { messageApi.error(res.error) } }) }} > Log out</Button> : null}
    </Header></>)
}

export default StationHeader;
