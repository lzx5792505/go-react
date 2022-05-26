import React, { useEffect, useState } from 'react'
import { http } from '../../store/http'
import { Table, Card } from 'antd'

function SiteInfo() {
  const [ data, setData ] = useState([])

  const columns = [
    {
      title: '语言版本',
      dataIndex: 'Language_version',
      align:'center'
    },
    {
      title: '服务器操作系统',
      dataIndex: 'Const_os',
      align:'center'
    },
    {
      title: '运行环境',
      dataIndex: 'Server_software',
      align:'center'
    },
    {
      title: 'CPU',
      dataIndex: 'Cpu',
      align:'center'
    }
  ]

  // 初始化数据
  useEffect(() => {
    const timeout = setTimeout(() => loadSeeting(), 100)
    return () => clearTimeout(timeout)
    async function loadSeeting() {
      await await http.get('/seeting').then(res => {
        setData([ res.data ])
      })
    }
  },[])

  return (
    <div> 
    <Card>
      <Table
        rowKey="id"
        columns={ columns }
        dataSource={ data }
        pagination={ false }
        bordered
      />
    </Card>
  </div>
  )
}

export default SiteInfo