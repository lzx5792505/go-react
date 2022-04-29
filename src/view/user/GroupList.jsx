import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import useKeyPress from '../../hooks/useKeyPress';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Switch, Space,Row, Col, Card, Form, Button, Input } from 'antd'

function GroupList() {
  const navigate = useNavigate()
  const [ form ] = Form.useForm()
  const enterPressed = useKeyPress(13)
  const [ groupList, setGroupList ] = useState({
    list:[],
    count:0
  })
  // 列表字段
  const columns = [
    {
      title: '组名',
      dataIndex: 'user',
      align:'center'
    },
    {
      title: '规则ID',
      dataIndex: 'name',
      align:'center'
    },
    {
      title: '是否禁用',
      dataIndex: 'status',
      align:'center',
      render:title => (
        <>
          <Switch checkedChildren="开启" unCheckedChildren="禁用" onChange={onSwitchChange} />
        </>
      ),
    },
    {
      title: '操作',
      align:'center',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={ () => goPublish(data.id) }/>
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={ () => delData(data.id) }/>
          </Space>
        )
      },
      fixed: 'right'
    }
  ]

  useEffect(() => {
    setGroupList({
      list:[
        {
          id:1,
          user:'测试数据',
          name:'测试名称',
          title:'超级管理员',
          login_count:1,
          last_login_ip:'127.0.0.1',
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

  const showUserModal = () => {
    navigate('/user/groupEdit')
  }

  const goPublish = id => {
    navigate('/user/groupEdit?id=' + id)
  }

  const onFinish = value => {
    console.log(value);
  }

  const delData = id => {
    navigate('/user/groupDelete?id=' + id)
  }

  const onSwitchChange = data => {
    console.log(data);
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
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginTop:5}}>
                  搜索
                </Button>
              </Form.Item>
              <Form.Item>
                <Button 
                  type="primary" 
                  danger  
                  style={{ marginLeft: 10,marginTop:5}}
                  onClick={ (e) => {e.preventDefault();e.stopPropagation();showUserModal()}}
                >
                  添加
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
        dataSource={groupList.list}
        pagination={false}
        bordered
      />
    </Card>
  </div>
  )
}

export default observer(GroupList)