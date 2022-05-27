import React, { useEffect, useState } from 'react'
import UserEdit from './UserEdit';
import { http } from '../../store/http'
import { observer } from 'mobx-react-lite'
import useKeyPress from '../../hooks/useKeyPress';
import { useStore as rootStore } from '../../store'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Switch, Space,Row, Col, Card, Form, Button, Input, Popconfirm, message } from 'antd'

function UserList() {
  // 回车按键
  const enterPressed = useKeyPress(13)
  // mobx 用户方法
  const { userStore } = rootStore()
  // 搜索字段
  const [ inputValue, setInputValue ] = useState('')
  // 用户列表
  const [ userDList, setUserDList ] = useState('')
  // 总数量
  const [ pageCount, setPageCount ] = useState('')
  // 请求参数
  const [ paramies, setParamies ] = useState({
    page:1,
    pre_page:10,
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
      dataIndex: 'last_login_at',
      align:'center'
    },
    {
      title: '是否禁用',
      align:'center',
      render: data => {
        return (
          <>
            {
              data.user !== 'admin' && 
              <>
                {
                  data.status === 1 && 
                  <Switch checked="1" checkedChildren="开启" unCheckedChildren="禁用" onChange={(checked) => onSwitchChange(checked, data.id)} />
                }
                {
                  data.status === 2 && 
                  <Switch checkedChildren="开启" unCheckedChildren="禁用" onChange={(checked) => onSwitchChange(checked, data.id)} />
                }
              </>
            }
          </>
        )
      },
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
              onClick={ () => goPublish(data.id) }
            />
            <Popconfirm
            onConfirm={() => delData(data.id) }
              title="是否确认删除？" 
              okText="确认" 
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      },
      fixed: 'right'
    }
  ]

  // 初始化数据 ( 处理发送2次的情况 )
  useEffect(() => {
    const timeout = setTimeout(() => loadList(), 100)
    return () => clearTimeout(timeout)

    async function loadList() {
      await http.get('/users').then(res => {
        dataList(res) 
      })
    }
  },[])

  // 回车搜索 ( 处理发送2次的情况 )
  useEffect(() => {
    const timeout = setTimeout(() => searchList(), 100)
    return () => clearTimeout(timeout)

    async function searchList() {
      if(enterPressed && inputValue){
        userDataList()
      }
    }
  },[ enterPressed ])

  // 提交搜索
  const onSearch = () => {
    userDataList()
  }

  // 是否禁用
  const onSwitchChange = (status, id) => {
    const values = {}
    if(status === true){
      values.status = 1
    }else{
      values.status = 2
    }

    userStore.saveStatus(id, values).then(res => {
      userDataList(res, '修改用户状态成功')
    })
  }

  // 删除数据
  const delData = id => {
    userStore.delUser(id).then(res => {
      userDataList(res, '删除用户成功')
    })
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
   const onFinishModal =  value => {
    const { user, name, password, group_id,status } = value
    const params = {
      user, 
      name, 
      password, 
      group_id: parseInt(group_id),
      status,
    }
    if(userID){
      userStore.updateUser(userID, params).then(res => {
        userDataList(res, '更新用户成功')
      })
    } else {
      userStore.saveUser(params).then(res => {
        userDataList(res, '添加用户成功')
      })
    }
    setVisible(false)
  }

  // 关闭抽屉页面
  const onCloseModal = () => {
    setUserID('')
    setVisible(false)
  };

  // 数据列表
  const userDataList = (res, msg) => {
    console.log(paramies);
    const data = {
      page : paramies.page,
      per_page : paramies.per_page,
      search : inputValue
    }
    if(res && (res.code === 200 || res.code === 201)){
      message.success(msg ?? res.message)
    }
    userStore.getUserList(data).then(res => {
      dataList(res)
    })
  }

  // 列表数据
  const dataList = ( res ) => {
    const { data, pager } = res

    setUserDList(data)
    setPageCount(pager.TotalCount)
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
          onFinish={ onSearch }
        >
            <Row gutter={24}>
              <Col span={6} key="1">
                <Form.Item name="search_name">
                    <Input onChange={(e) => { setInputValue(e.target.value) }} size='large' placeholder='请输账号 或者 昵称' />
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
        columns={ columns }
        dataSource={ userDList }
        pagination={
          {
            pageSize: paramies.per_page,
            total: pageCount,
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