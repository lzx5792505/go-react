import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import useKeyPress from '../../hooks/useKeyPress';
import { useStore as rootStore } from '../../store'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Switch, Space,Row, Col, Card, Form, Button, Input, Popconfirm, message } from 'antd'

import { http } from '../../store/http'
import GroupEdit from './GroupEdit';
import GroupRole from './GroupRole'

function GroupList() {
  // mobx 方法
  const { groupStore } = rootStore()
  const enterPressed = useKeyPress(13)
  // 列表
  const [ groupList, setGroupList ] = useState('')
  // 搜索字段
  const [ searchValue, setSearchValue ] = useState('')
  // 列表字段
  const columns = [
    {
      title: '组名',
      dataIndex: 'title',
      align:'center'
    },
    {
      title: '规则ID',
      dataIndex: 'rules',
      align:'center'
    },
    {
      title: '是否禁用',
      align:'center',
      render: data => {
        return (
          <>
            {
              data.title !== '超级管理员组' && 
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
            <Button
              shape="circle"
              type="primary"
              className="purple"
              icon={<EditOutlined />}
              onClick={ () => goGroupList(data.id) }
            />
            {
              data.id !== 1 &&
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
            }
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
      await http.get('/group').then(res => {
        dataList(res) 
      })
    }
  },[])

  // 回车搜索 ( 处理发送2次的情况 )
  useEffect(() => {
    const timeout = setTimeout(() => searchList(), 100)
    return () => clearTimeout(timeout)

    async function searchList() {
      if(enterPressed && searchValue){
        await groupDataList()
      }
    }
  },[ enterPressed ])

  // 提交搜索
  const onSearch = () => {
    groupDataList()
  }

  // 修改用户组状态
  const onSwitchChange = (status, id) => {
    const _params = {}
    if(status === true){
      _params.status = 1
    } else {
      _params.status = 2
    }

    groupStore.saveStatus(id, _params).then(res => {
      groupDataList(res, '修改用户组状态成功')
    })
  }

  // 删除
  const delData = id => {
    groupStore.delGroup(id).then(res => {
      groupDataList(res, '删除用户组成功')
    })
  }

  // 抽屉式数据
  const [ visible, setVisible ] =  useState(false)
  const [ groupID, setGroupID ] =  useState('')
  // 新增用户组
  const showUserModal = () => {
    setGroupID('')
    setVisible(true)
  }
  // 编辑用户组
  const goPublish = id => {
    setGroupID(id)
    setVisible(true)
  }

  // 保存用户组
  const onFinishModal = value => {
    const { title } = value
    const params = {
      title, 
    }
    if(groupID){
      groupStore.updateGroup(groupID, params).then(res => {
        groupDataList(res, '更新用户组成功')
      })
    } else {
      groupStore.saveGroup(params).then(res => {
        groupDataList(res, '添加用户组成功')
      })
    }
    setVisible(false)
  }
  // 关闭抽屉页面
  const onCloseModal = () => {
    setGroupID('')
    setVisible(false)
  };

  // 访问规则
  const [ visibleGroup, setVisibleGroup ] =  useState(false)
  const goGroupList = value => {
    setGroupID(value)
    setVisibleGroup(true)
  }
  // 保存访问规则
  const onFinishGroup = value => {
    const _params = {}
    if(value) {
      _params.rules = value
    }
    groupStore.saveRule(groupID, _params).then(res => {
      groupDataList(res, '添加访问规则成功')
    })
    setVisibleGroup(false)
  }
  const onCloseGroup = () => {
    setVisibleGroup(false)
  }

  // 数据列表
  const groupDataList = (res, msg) => {
    const data = {
      search : searchValue
    }
    if(res && (res.code === 200 || res.code === 201)){
      message.success(msg ?? res.message)
    }
    groupStore.getGroupList(data).then(res => {
      dataList(res)
    })
  }

  // 列表数据
  const dataList = ( res ) => {
    const { data } = res
    setGroupList(data)
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
                <Form.Item name="search">
                    <Input onChange={(e) => { setSearchValue(e.target.value) }} size='large' placeholder='请输账号 或者 昵称' />
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
        dataSource={ groupList }
        pagination={ false }
        bordered
      />
    </Card>
    <GroupEdit
      groupID={ groupID }
      activeVisible={ visible }
      onFinishModal={ onFinishModal }
      onCloseModal={ onCloseModal }
    />
    <GroupRole 
      activeVisible={ visibleGroup }
      onFinishModal={ onFinishGroup }
      onCloseModal={ onCloseGroup }
    />
  </div>
  )
}

export default observer(GroupList)