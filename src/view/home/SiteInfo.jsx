import React from 'react'
import { Table, Card } from 'antd'

function SiteInfo() {

  const columns = [
    {
      title: '语言版本',
      dataIndex: 'language_version',
      align:'center'
    },
    {
      title: '服务器操作系统',
      dataIndex: 'const_os',
      align:'center'
    },
    {
      title: '运行环境',
      dataIndex: 'server_software',
      align:'center'
    },
    {
      title: '数据库版本',
      dataIndex: 'data_version',
      align:'center'
    },
    {
      title: '最大上传限制',
      dataIndex: 'upload_max_fileSize',
      align:'center'
    }
  ]

  // 请求数据库 （ 只是数据展示 ） 
  const data = [
    {
      id:'1',
      language_version: 'golang',
      const_os: 'win11',
      server_software: 'golang 1.18',
      data_version: '5.7',
      upload_max_fileSize:'100'
    }
  ];


  return (
    <div> 
    <Card>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
      />
    </Card>
  </div>
  )
}

export default SiteInfo