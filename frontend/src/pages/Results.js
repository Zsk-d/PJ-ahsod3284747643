import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Descriptions, } from 'antd';
import Header from '../components/StationHeader'
import * as  echarts from 'echarts';

const Page = () => {
  const [res, sres] = useState([])
  const [chartOption, schartOption] = useState({
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {},
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  })
  const location = useLocation()
  const state = location.state
  let results = state && state.results || [
    {
      name: 'User01',
      correct: 'Yes,No',
      score: 7,
      totalScore: 27
    },
    {
      name: 'User02',
      correct: 'Yes,Yes',
      score: 27,
      totalScore: 27
    },
    {
      name: 'User03',
      correct: 'No,Yes',
      score: 20,
      totalScore: 27
    },
    {
      name: 'User04',
      correct: 'No,No',
      score: 0,
      totalScore: 27
    },
  ]
  const contentStyle = {}
  useEffect(() => {
    for (var i = 0; i < results.length - 1; i++) {
      for (var j = 0; j < results.length - 1 - i; j++) {
        if (results[j].score < results[j + 1].score) {
          var temp = results[j];
          results[j] = results[j + 1];
          results[j + 1] = temp;
        }
      }
    }
    results = results.slice(0, 5)
    sres(results)

    chartOption.xAxis.data = results.map(item => item.name)
    chartOption.series[0].data = results.map(item => item.score)
    schartOption(chartOption)
    setTimeout(() => {
      let chartEl = document.getElementById('chart-el')
      console.log('-----< chartEl', chartEl)
      let mychart = echarts.init(chartEl)
      console.log('-----< mychart', mychart)
      mychart.setOption(chartOption)
      console.log('-----< chartOption', chartOption)
    }, 500);
  }, [])
  return (
    <>
      <Header title={'Results'} hideBackBtn={false} hasLogoutBtn={true}></Header>
      <div>
        <div id='chart-el' style={{ height: '250px' }}></div>
      </div>
      <h3>The answer results of the top five in total score</h3>
      <div style={contentStyle}>
        {res.map(({ name, correct, score, totalScore }) => {
          let index = 1
          return <Descriptions style={{ margin: ' 20px 0px' }} key={name} bordered={true}>
            <Descriptions.Item label="Player Name">{name}</Descriptions.Item>
            <Descriptions.Item label="Score">{score}</Descriptions.Item>
            <Descriptions.Item label="Total Score">{totalScore}</Descriptions.Item>
            <Descriptions.Item label="Answer Results">{correct.split(',').map(item => <div>{index++}. Correct: {item}</div>)}</Descriptions.Item>
          </Descriptions>
        })}
      </div>
    </>)
}

export default Page;
