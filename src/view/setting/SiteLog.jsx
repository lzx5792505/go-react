import React, { useEffect, useState } from 'react'

import 'moment/locale/zh-cn'
import { observer } from 'mobx-react-lite'
import useKeyPress from '../../hooks/useKeyPress';
import locale from 'antd/es/date-picker/locale/zh_CN'
import { Table, Row, Col, Card, Form, Button, Input, DatePicker } from 'antd'

function SiteLog() {
  const [ form ] = Form.useForm()
  const enterPressed = useKeyPress(13)
  const [ sieLogList, setSieLogList ] = useState({
    list:[],
    count:0,
    startDate:'',
    lastDate: '',
  })
  const [ paramies, setParamies ] = useState({
    page:1,
    pre_page:10
  })

  // 列表字段
  const columns = [
    {
      title: '账号',
      dataIndex: 'user',
      align:'center'
    },
    {
      title: '昵称',
      dataIndex: 'name',
      align:'center'
    },
    {
      title: '最后登录IP',
      dataIndex: 'title',
      align:'center'
    },
    {
      title: '登录时间',
      dataIndex: 'last_login_time',
      align:'center'
    }
  ]

  useEffect(() => {
    setSieLogList({
      list:[
        {
          id:1,
          user:'测试数据',
          name:'测试名称',
          title:'超级管理员',
          last_login_time:'2022-04-28'
        }
      ],
      count:1
    })
  },[])

  useEffect(() => {
    const search = form.getFieldValue('search')
    if(enterPressed && search.length > 0){
      onFinish(search)
    }
  },[ enterPressed ])

  const onFinish = value => {
    const {search } = value
    const _params = {}
    if(search !== -1){
      _params.search = search
    }
    if(sieLogList.startDate){
      _params.startDate = sieLogList.startDate
    }
    if(sieLogList.lastDate){
      _params.lastDate = sieLogList.lastDate
    }

    setParamies({ ...paramies, ..._params })
  }

  const onStartChange = (date, dateString) => {
    setSieLogList({
      startDate:dateString
    })
  }

  const onLastChange = (date, dateString) => {
    setSieLogList({
      lastDate:dateString
    })
  }

  const pageChange = () => {
  }

  return (
    <div>
      <Card>
        <Form
          layout="horizontal"
          onFinish={ onFinish }
          initialValues={{ status: -1 }}
          form={ form }
        >
            <Row gutter={24}>
              <Col span={3} key="1">
                <Form.Item name="search">
                    <Input size='large' placeholder='请输账号 或者 昵称' />
                </Form.Item>
              </Col>
              <Col span={3} key="2">
                <Form.Item  name="start_date">
                  <DatePicker locale={locale} placeholder="开始日期" onChange={onStartChange} style={{ marginTop:5}}></DatePicker>
                </Form.Item>
              </Col>
              <Col span={3} key="3">
                <Form.Item  name="last_date">
                  <DatePicker locale={locale} placeholder="结束日期" onChange={onLastChange} style={{ marginTop:5}}></DatePicker>
                </Form.Item>
              </Col>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginTop:5}}>
                  搜索
                </Button>
              </Form.Item>
            </Row>
        </Form>
      </Card>
    {/* 文章列表区域 */}
    <Card>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={sieLogList.list}
        pagination={
          {
            pageSize: paramies.pre_page,
            total: sieLogList.count,
            onChange:pageChange,
            current: paramies.page
          }
        }
        bordered
      />
    </Card>
  </div>
  )
}

export default observer(SiteLog)