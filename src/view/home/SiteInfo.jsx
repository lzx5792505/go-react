import React from 'react'
import { Table, Card } from 'antd'
import siteInfo from '../../store/columns/siteInfo'

function SiteInfo() {
  
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
        columns={siteInfo}
        dataSource={data}
        pagination={false}
        bordered
      />
    </Card>
  </div>
  )
}

export default SiteInfo