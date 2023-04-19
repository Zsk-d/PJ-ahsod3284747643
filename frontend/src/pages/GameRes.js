import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'antd';

const Page = () => {
  const [res, sres] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state
  const score = state && state.score || 20
  let results = state && state.res || [
    "1. Correct: Yes",
    "2. Correct: No",
  ]
  debugger
  const contentStyle = {}
  useEffect(() => {
    sres(results)
  }, [])
  return (
    <>
      <Button onClick={() => {
        navigate('/')
      }} style={{ margin: 10 }}>Exit</Button>
      <div style={contentStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3>Your answer results:</h3>
          <div style={{ margin: 10 }}> <label>Score: {score}</label></div>
          {res.map(item => {
            return <div style={{ margin: 10 }}> <label>{item}</label></div>
          })}</div>
      </div>
    </>)
}

export default Page;
