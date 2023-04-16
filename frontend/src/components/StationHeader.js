import { React } from 'react';
import { Button, Layout, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom'
import util from '../util';
const { Header } = Layout;

const StationHeader = ({ title, hideBackBtn, hasLogoutBtn }) => {
  const navigate = useNavigate()
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
  return (<>
    <Row>
      <Col span={24}>
        <Header style={headerStyle}>
          {title ? <label style={titleStyle}>{title}</label> : null}
          {!hideBackBtn ? <Button type='primary' onClick={() => { window.history.back() }} > Go back</Button> : <label> </label>}
          {hasLogoutBtn ? <Button type='primary' onClick={() => { util.logout(() => { navigate('/') }) }} > Log out</Button> : null}
        </Header></Col>
    </Row>
  </>)
}

export default StationHeader;
