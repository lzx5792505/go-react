import React, { useEffect, useState } from 'react'
import UserEdit from './UserEdit';
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import useKeyPress from '../../hooks/useKeyPress';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Switch, Space,Row, Col, Card, Form, Button, Input } from 'antd'

function UserList() {
  const navigate = useNavigate()
  const [ form ] = Form.useForm()
  const enterPressed = useKeyPress(13)
  const [ userList, setUserList ] = useState({
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
      dataIndex: 'user',
      align:'center'
    },
    {
      title: '昵称',
      dataIndex: 'name',
      align:'center'
    },
    {
      title: '所属组',
      dataIndex: 'title',
      align:'center'
    },
    {
      title: '登陆次数',
      dataIndex: 'login_count',
      align:'center',
      defaultSortOrder:'descend'
    },
    {
      title: '最后登录IP',
      dataIndex: 'last_login_ip',
      align:'center',
      defaultSortOrder:'descend'
    },
    {
      title: '最后登录时间',
      dataIndex: 'last_login_time',
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

  // 初始化获取数据
  useEffect(() => {
    setUserList({
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

  // 回车搜索
  useEffect(() => {
    const search = form.getFieldValue('search')
    if(enterPressed && search.length > 0){
      onFinish(search)
    }
  },[ enterPressed ])

  // 提交搜索
  const onFinish = value => {
    const {search } = value
    const _params = {}
    if(search !== -1){
      _params.search = search
    }
    setParamies({ ...paramies, ..._params })
  }

  // 删除数据
  const delData = id => {
    navigate('/user/delete?id=' + id)
  }

  // 点击分页
  const pageChange = () => {

  }

  // 是否禁用
  const onSwitchChange = data => {
    console.log(data);
  }

  // 抽屉式数据
  const [ visible, setVisible ] =  useState(false)
  const [ userID, setUserID ] =  useState('')
  // 新增用户
  const showUserModal = () => {
    setUserID('')
    setVisible(true)
  }
  // 编辑用户
  const goPublish = id => {
    setUserID(id)
    setVisible(true)
  }
  // 保存用户
  const onFinishModal = data => {
    console.log(data);
  }
  // 关闭抽屉页面
  const onCloseModal = () => {
    setUserID('')
    setVisible(false)
      
  };
  
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
        dataSource={userList.list}
        pagination={
          {
            pageSize: paramies.pre_page,
            total: userList.count,
            onChange:pageChange,
            current: paramies.page
          }
        }
        bordered
      />
    </Card>
    <UserEdit 
      userID={ userID }
      activeVisible={ visible }
      onFinishModal={onFinishModal}
      onCloseModal={ onCloseModal }
    />
  </div>
  )
}

export default observer(UserList)