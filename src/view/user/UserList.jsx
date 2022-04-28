import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'moment/locale/zh-cn'
import { observer } from 'mobx-react-lite'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Tag, Space, Card, Form, Button, Radio, DatePicker, Select } from 'antd'

function UserList() {
  const { Option } = Select
  const { RangePicker } = DatePicker
  const navigate = useNavigate()
  const [ siteInfo, setSiteInfo ] = useState({
    list:[],
    count:0
  })
  const [paramies, setParamies] = useState({
    page:1,
    pre_page:10
  })

  // 列表字段
  const columns = [
    {
      title: '账号',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '昵称',
      dataIndex: 'pubdate'
    },
    {
      title: '所属组',
      dataIndex: 'read_count'
    },
    {
      title: '登陆次数',
      dataIndex: 'comment_count'
    },
    {
      title: '登录IP',
      dataIndex: 'like_count'
    },
    {
      title: '最后登录时间',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={ () => goPublish(data) }/>
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={ () => delData(data) }/>
          </Space>
        )
      },
      fixed: 'right'
    }
  ]

  const onFinish = () => {

  }

  const goPublish = () => {

  }

  const delData = () => {

  }

  const pageChange = () => {

  }
  
  return (
    <div>
      <Card>
        <Form
          onFinish={ onFinish }
          initialValues={{ status: -1 }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              
              <Option value="1" key="1">111</Option>
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
    {/* 文章列表区域 */}
    <Card title={`根据筛选条件共查询到 ${siteInfo.count} 条结果：`}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={siteInfo.list}
        pagination={
          {
            pageSize: paramies.pre_page,
            total: siteInfo.count,
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

export default observer(UserList)