import { useRef as Refs, useEffect as Effect } from 'react'
import * as echarts from 'echarts'

export default function Index ({ title,  xData, yData, echStyle}) {
    const domRef = Refs()

    const chartsInit = () => {
        const myChart = echarts.init(domRef.current)

        myChart.setOption({
            title:{
                text:title
            },
            tooltop:{},
            xAxis:{
                data:xData
            },
            yAxis:{},
            series:[
                {
                    name:'123',
                    type:'bar',
                    data:yData
                }
            ]
        })
    }

    Effect(() => {
        chartsInit()
    })

    return (
        <>
            <div ref={ domRef } className={ echStyle }></div>
        </>
    )
}
