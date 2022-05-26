import React, { useCallback, useEffect, useState } from 'react'
import UserEdit from './UserEdit';
import { http } from '../../store/http'
import { useStore as rootStore } from '../../store'
import { observer } from 'mobx-react-lite'
import useKeyPress from '../../hooks/useKeyPress';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Switch, Space,Row, Col, Card, Form, Button, Input, Popconfirm, message } from 'antd'

function UserList() {
  const enterPressed = useKeyPress(13)
  const { userStore } = rootStore()

  const [ form ] = Form.useForm()
  const [ userDList, setUserDList ] = useState()
  const [ pageCount, setPageCount ] = useState()
  const [ paramies, setParamies ] = useState({
    page:1,
    per_page:10
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

  // 初始化数据
  useEffect(() => {
    const timeout = setTimeout(() => loadList(), 100)
    return () => clearTimeout(timeout)
    async function loadList() {
      await http.get('/users').then(res => {
        dataList(res) 
      })
    }
  },[])

  // 回车搜索
  useEffect(() => {
    const search = form.getFieldValue('search')
    if(enterPressed && search.length > 0){
      onSearch(search)
    }
  },[ enterPressed ])

  // 提交搜索
  const onSearch = value => {
    const { search } = value
    const _params = {}
    if(search !== -1){
      _params.search = search
    }
    setParamies({ ...paramies, ..._params })
  }

  // 删除数据
  const delData = id => {
    userStore.delUser().then(res => {
      if(res.code === 200){
        message.success('删除成功')
      }
    })
  }

  // 是否禁用
  const onSwitchChange = (status, id) => {
    const _params = {}
    if(status === true){
      _params.status = 1
    }else{
      _params.status = 2
    }
    setParamies({ ...paramies, ..._params })
    userStore.saveStatus(id, _params).then(res => {
      if(res.code === 200){
        message.success('修改成功')
      }
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
      userStore.updateUser(userID, params)
    } else {
      userStore.saveUser(params)
    }
    setVisible(false)
    message.success(`${userID ? '更新成功' : '添加成功'}`)
  }

  // 关闭抽屉页面
  const onCloseModal = () => {
    setUserID('')
    setVisible(false)
  };

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
          initialValues={{ status: -1 }}
          form={form}
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