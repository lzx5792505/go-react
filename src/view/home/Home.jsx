import React, { useEffect, useState } from 'react'
import Echarts from '@/components/Echarts'
import { http } from '../../store/http'

import '@/assets/scss/home.scss'

export default function Index () {
  const [ echar, setEchar ] = useState({
    title:'',
    xData:[],
    yData:[]
  })

  // 初始化数据 （测试案例）已实际开发为主！
  useEffect(() => {
    const loadChart = async () => {
      const res = await http.get('/seeting/chart')
      const { data, code } = res
      if(code === 200){
        setEchar({
          title: data.Title,
          xData:data.XData,
          yData:data.YData
        })
      }
    }
    loadChart()
  },[])

  return (
    <div className='home'>
      <Echarts title={ echar.title } xData={ echar.xData } yData={echar.yData}  echStyle="home-item" />
    </div>
  )
}
