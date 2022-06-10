import React, { useEffect, useState } from 'react'

import 'moment/locale/zh-cn'
import { observer } from 'mobx-react-lite'
import useKeyPress from '../../hooks/useKeyPress';
import { useStore as rootStore } from '../../store';
import locale from 'antd/es/date-picker/locale/zh_CN'
import { Table, Row, Col, Card, Form, Button, Input, DatePicker } from 'antd'

function SiteLog() {
  const [ form ] = Form.useForm()
  const { siteStore } = rootStore()
  const enterPressed = useKeyPress(13)
  const [ sieLogList, setSieLogList ] = useState({
    list:[],
    count:0,
  })
  const [ paramies, setParamies ] = useState({
    page:1,
    pre_page:10,
    created_at:'',
    updated_at: '',
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
      dataIndex: 'last_login_ip',
      align:'center'
    },
    {
      title: '登录时间',
      dataIndex: 'updated_at',
      align:'center'
    }
  ]

  useEffect(() => {
    const timeout = setTimeout(() => loadList(), 100)
    return () => clearTimeout(timeout)

    async function loadList() {
      await siteStore.getLogList().then(res => {
        dataList(res)
      })
    }
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
    if(sieLogList.updated_at){
      _params.created_at = paramies.created_at
    }
    if(sieLogList.lastDate){
      _params.updated_at = paramies.updated_at
    }

    setParamies({ ...paramies, ..._params })
  }

  const onStartChange = (date, dateString) => {
    setParamies({
      created_at:dateString
    })
  }

  const onLastChange = (date, dateString) => {
    setParamies({
      updated_at:dateString
    })
  }

  const pageChange = () => {
  }

  const dataList = (res) => {
    const { data, pager } = res

    setSieLogList({
      list:data,
      count:pager.TotalCount,
    })
    setParamies({ 
      page:pager.CurrentPage, 
      per_page:pager.PerPage 
    })
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