import React, { useEffect, useState } from 'react'
import { toJS } from 'mobx'
import { useStore as rootStore } from '../../store'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Row, Card, Form, Button, Popconfirm, Space } from 'antd'

import SiteMenuEdit from './SiteMenuEdit'

function SiteMenu() {
  // 数据
  const { menuStore } = rootStore()
  const [ siteMenu, setSiteMenu ] = useState([])


  // 列表字段
  const columns = [
    {
      title: '控制器方法',
      dataIndex: 'title',
      align:'center'
    },
    {
      title: '权限名称',
      dataIndex: 'url',
      align:'center'
    },
    {
      title: '图标',
      dataIndex: 'icon',
      align:'center'
    },
    {
      title: '操作',
      align:'center',
      render: data => {
        return (
          <>
            {
              data.id !== 1 && data.id !== 2 && data.id !== 3 &&
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
            }
          </> 
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
      const res =  await menuStore.loadMenuList()
      setSiteMenu(res)
    }
  },[])

  const delData = id => {

  }

  // 抽屉式数据
  const [ visible, setVisible ] =  useState(false)
  const [ menuID, setMenuID ] =  useState('')
  // 新增用户
  const showUserModal = () => {
    setMenuID('')
    setVisible(true)
  }
  // 编辑用户
  const goPublish = id => {
    setMenuID(id)
    setVisible(true)
  }
  // 保存用户
  const onFinishModal = value => {
    console.log(menuID);
    console.log(value);
    setVisible(false)
  }
  // 关闭抽屉页面
  const onCloseModal = () => {
    setMenuID('')
    setVisible(false)
  };

  // 点击展开
  // const [expKeys, setExpKeys] = useState([]);
  // const onOpenMenu = () => {
  //   siteMenu.list.map(item => {
  //     console.log(item);
  //   })
  // }

  return (
    <div>
      <Card>
        <Form
          layout="horizontal"
        >
            <Row gutter={24}>
              <Form.Item>
                <Button 
                  type="primary" 
                  danger  
                  style={{ marginTop:5}}
                  onClick={ showUserModal }
                >
                  添加节点
                </Button>
              </Form.Item>
              {/* <Form.Item>
                <Button 
                  type="primary"
                  onClick={ onOpenMenu }
                  style={{ marginLeft: 10,marginTop:5}}
                >
                  展开或折叠全部
                </Button>
              </Form.Item> */}
            </Row>
        </Form>
      </Card>
    {/* 文章列表区域 */}
    <Card>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={ toJS(siteMenu) }
        pagination={false}
        defaultExpandAllRows={true}
      />
    </Card>
    <SiteMenuEdit 
      menuID={ menuID }
      activeVisible={ visible }
      onFinishModal={ onFinishModal }
      onCloseModal={ onCloseModal }
    />
  </div>
  )
}

export default SiteMenu
