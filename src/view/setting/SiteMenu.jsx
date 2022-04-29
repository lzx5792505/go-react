import React, { useEffect, useState } from 'react'
import { Icon } from '@ant-design/icons'
import { Table, Row, Card, Form, Button } from 'antd'

function SiteMenu() {
  const [ siteMenu, setSiteMenu ] = useState({
    list:[],
    expandedRowKeys:[]
  })

  // 列表字段
  const columns = [
    {
      title: '控制器方法',
      dataIndex: 'title',
      align:'center'
    },
    {
      title: '权限名称',
      dataIndex: 'name',
      align:'center'
    },
    {
      title: '类型',
      dataIndex: 'login_count',
      align:'center',
      defaultSortOrder:'descend'
    },
    {
      title: '图标',
      dataIndex: 'user',
      align:'center'
    },
    {
      title: '排序',
      dataIndex: 'last_login_ip',
      align:'center',
      defaultSortOrder:'descend'
    }
  ]

  useEffect(() => {
    setSiteMenu({
      list:[
        {
          id:111,
          user:'测试数据',
          name:'测试名称',
          title:'超级管理员',
          login_count:1,
          last_login_ip:'127.0.0.1',
        },
        {
          id:1,
          user:'测试数据',
          name:'测试名称',
          title:'超级管理员',
          login_count:1,
          last_login_ip:'127.0.0.1',
          children: [
            {
              id:2,
              user:'测试数据',
              name:'测试名称',
              title:'超级管理员',
              login_count:1,
              last_login_ip:'127.0.0.1',
            },
            {
              id:3,
              user:'测试数据',
              name:'测试名称',
              title:'超级管理员',
              login_count:1,
              last_login_ip:'127.0.0.1',
              children: [
                {
                  id:4,
                  user:'测试数据',
                  name:'测试名称',
                  title:'超级管理员',
                  login_count:1,
                  last_login_ip:'127.0.0.1',
                },
              ],
            },
            {
              id:5,
              user:'测试数据',
              name:'测试名称',
              title:'超级管理员',
              login_count:1,
              last_login_ip:'127.0.0.1',
              children: [
                {
                  id:6,
                  user:'测试数据',
                  name:'测试名称',
                  title:'超级管理员',
                  login_count:1,
                  last_login_ip:'127.0.0.1',
                  children: [
                    {
                      id:7,
                      user:'测试数据',
                      name:'测试名称',
                      title:'超级管理员',
                      login_count:1,
                      last_login_ip:'127.0.0.1',
                    },
                    {
                      id:8,
                      user:'测试数据',
                      name:'测试名称',
                      title:'超级管理员',
                      login_count:1,
                      last_login_ip:'127.0.0.1',
                    },
                  ],
                },
              ],
            },
          ],
        }
      ],
    })
  },[])
  
  const showMenuModal = () => {

  }
  
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
                  onClick={ (e) => {e.preventDefault();e.stopPropagation();showMenuModal()}}
                >
                  添加节点
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginLeft: 10,marginTop:5}}>
                  展开或折叠全部
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
        dataSource={siteMenu.list}
        pagination={false}
        defaultExpandAllRows={true}
      />
    </Card>
  </div>
  )
}

export default SiteMenu
