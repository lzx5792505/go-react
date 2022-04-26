import React, { useEffect, useState } from 'react'
import { Outlet, Link, useLocation as Pathies, useNavigate as  Navigate} from 'react-router-dom'
import { Layout, Menu, Popconfirm, Breadcrumb } from 'antd'
import TabList from '../../components/TabList'
import { observer } from 'mobx-react-lite'
import * as Icon from '@ant-design/icons'
import '@/assets/scss/layout.scss'

// 模拟数据，写后端在引入真实数据
import defaultData from '../../utils/defaultData'

function RootLayout () {
  const navigate = Navigate()
  const { pathname } = Pathies()
  const { LogoutOutlined } = Icon
  const { Header, Sider } = Layout
  const [ openKeys, setOpenKeys ] = useState([])
  const [ selectKey, setSelectKey ] = useState([])

  // Tab存储仓库
  const [ openMenuData, setOpenMenuData ] = useState([])
  const [ activeMenuID, setActiveMenuID ] = useState('')
  
  // 图标显示
  const iconfont = (name) => {
    return React.createElement(Icon[name])
  }

  // 选中一级菜单
  const onOpenChange = (path) => {
    if(path === '/'){ // 切换首页情况
      onPublish()
    }else if(path.length > 1){ // 设置选中菜单
      const keys = path[ path.length - 1 ]
      const lastKeys = keys + '/' + keys.substring(1)
      setOpenKeys([ keys, lastKeys])
      setSelectKey([lastKeys])
      if( keys !== '/home'){
        navigate(lastKeys)
      } else {
        onPublish()
      }
    }
  }
  
  // 点击菜单
  const onClickMenu = (e) => {
    setSelectKey([e.key])
    setActiveMenuID(e.key)
    // 获取值
    menuData(e.key)
  }

  // 初次渲染选中首页，刷新选中当前菜单
  useEffect(() => {
    const keys = '/' + pathname.split('/')[1]
    if(keys === '/'){
      onPublish()
    }else {
      setOpenKeys([ keys, pathname ])
      setSelectKey([pathname])
      setActiveMenuID(pathname)
      menuData(pathname)
    }    
  }, [])

  // 跳转公共方法
  const onPublish = () => {
    setOpenKeys([ '/home', '/'])
    setActiveMenuID('/')
    setSelectKey(['/'])
    navigate('/')
    menuData('/')
  }

  // 顶部选中菜单数据（有个小功能待完善）
  const menuData = (key) => {
    defaultData.find(item => {
      return item.children.length && item.children.find(child => {
        if(child.url === key){
          if(!openMenuData.includes(child)){
            setOpenMenuData([ ...openMenuData, child ])
          }
        }
        return false
      })
    })
  }

  // 渲染父级菜单
  const renderMenu = (item) => {
    const {title, url, icon, children} =  item
    return (
      <Menu.SubMenu key={ url } icon={ icon && iconfont(icon) } title={ title }>
        {
          children &&
          children.map(item => {
            return item.children && item.children.length > 0 ?
              renderMenu(item) :
              renderMenuItem(item)
          })
        }
      </Menu.SubMenu>
    )
  }

  // 渲染子级菜单
  const renderMenuItem = (item) => {
    const {title, url, icon} =  item
    return (
      <Menu.Item icon={ icon && iconfont(icon) } key={ url }>
        <Link to={ url }>{ title }</Link>
      </Menu.Item>
    )
  }

  // 点击的菜单顶部显示
  const tabClick = (ids) => {
    setActiveMenuID(ids)
    navigate(ids)
  }

  // 关闭顶部显示菜单
  const tabClose = (ids) => {
    const tabWithout = openMenuData.filter( openID => openID.url !== ids)
    const activeWithout = openMenuData.filter( openID => openID.url === activeMenuID)
    setOpenMenuData(tabWithout)
    if(tabWithout.length > 0){
      if(activeWithout.length > 0){
        setActiveMenuID(activeWithout[0]['url'])
      }else{
        setActiveMenuID(tabWithout[0]['url'])
      }
    }else{
      setActiveMenuID('')
      navigate('/')
    }
  }

  // 退出方法
  const onConfirm = () => {
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="menu-list">
          <TabList
            item={ openMenuData }
            activeId={ activeMenuID }
            onTabClick={ tabClick }
            onCloseTab={ tabClose }
          />
        </div>
        <div className="user-info">
          <span className="user-name">111</span>
          <span className="user-logout">
            <Popconfirm
            onConfirm={onConfirm}
              title="是否确认退出？" 
              okText="退出" 
              cancelText="取消"
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            openKeys={ openKeys }
            onOpenChange={ onOpenChange }
            onClick={ onClickMenu }
            selectedKeys={ selectKey }
            style={{ height: '100%', borderRight: 0 }}
          >
            {
              defaultData &&
              defaultData.map(item => {
                return item.children && item.children.length > 0 ?
                  renderMenu(item) :
                  renderMenuItem(item)
              })
            }
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 面包屑 */}
          <Breadcrumb style={{margin:'8px 0'}}>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(RootLayout)
