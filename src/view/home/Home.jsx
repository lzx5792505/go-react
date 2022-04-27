import React from 'react'
import Echarts from '@/components/Echarts'
import '@/assets/scss/home.scss'

export default function Index () {
  return (
    <div className='home'>
      <Echarts title="1111" xData={['1','2','3','4']} yData={[1,2,3,4]}  style="home-item" />
      <Echarts title="1111" xData={['1','2','3','4']} yData={[1,2,3,4]}  style="home-item-l" />
    </div>
  )
}
