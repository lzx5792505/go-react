import React, { useEffect, useState } from 'react'
import { Outlet, Link, useLocation as Pathies, useNavigate as  Navigate} from 'react-router-dom'
import { Layout, Menu, Popconfirm, Breadcrumb, Divider } from 'antd'
import TabList from '../../components/TabList'
import { observer } from 'mobx-react-lite'
import * as Icon from '@ant-design/icons'
import '@/assets/scss/layout.scss'

// 模拟数据，写后端在引入真实数据
import defaultData from '../../utils/defaultData'
const { LogoutOutlined, ClearOutlined  } = Icon

function RootLayout () {
  const navigate = Navigate()
  const { pathname } = Pathies()
  const { Header, Sider } = Layout
  const [ openKeys, setOpenKeys ] = useState([])
  const [ selectKey, setSelectKey ] = useState([])
  // Tab存储仓库
  const [ openMenuData, setOpenMenuData ] = useState([])
  const [ activeMenuID, setActiveMenuID ] = useState('')
  // 面包屑导航
  const [ brad, setBrad ] =  useState('')
  const [ bradMenu, setBradMenu ] = useState('')
  // 图标显示
  const iconfont = name => {
    return React.createElement(Icon[name])
  }

  // 选中一级菜单
  const onOpenChange = path => {
    // 切换首页情况
    if(path === '/'){
      onPublish()
    } else if(path.length > 1){ // 切换选中菜单
      const keys = path[ path.length - 1 ]
      const lastKeys = keys + '/' + keys.substring(1)
      setOpenKeys([ keys, lastKeys ])
      setSelectKey([ lastKeys ])
      if(keys !== '/home'){
        setActiveMenuID(lastKeys)
        menuData(lastKeys)
        bread(lastKeys)
        navigate(lastKeys)
      }else{
        onPublish()
      }
    }
  }
  
  // 点击菜单
  const onClickMenu = e => {
    setSelectKey([ e.key ])
    setActiveMenuID(e.key)
    menuData(e.key)
    bread(e.key)
  }

  // 初次渲染选中首页，刷新选中当前菜单 （刷新后菜单保存只有一个，需重写）
  useEffect(() => {
    const keys = '/' + pathname.split('/')[1]
    if(keys === '/'){
      onPublish()
    }else{
      setOpenKeys([ keys, pathname ])
      setSelectKey([ pathname ])
      setActiveMenuID(pathname)
      menuData(pathname)
      bread(pathname)
    }    
  }, [])

  // 跳转公共方法
  const onPublish = () => {
    setOpenKeys([ '/home', '/' ])
    setSelectKey([ '/' ])
    setActiveMenuID('/')
    menuData('/')
    bread('/')
    navigate('/')
  }

  // 顶部选中菜单数据
  const menuData = key => {
    defaultData.find(item => {
      return item.children.length && item.children.find(child => {
        if(child.url === key && !openMenuData.includes(child)){
          setOpenMenuData([ ...openMenuData, child ])
        }
        return false
      })
    })
  }

  // 渲染父级菜单
  const renderMenu = item => {
    const { title, url, icon, children } =  item
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
  const renderMenuItem = item => {
    const { title, url, icon } =  item
    return (
      <Menu.Item icon={ icon && iconfont(icon) } key={ url }>
        <Link to={ url }>{ title }</Link>
      </Menu.Item>
    )
  }

  // 点击菜单顶部显示
  const tabClick = ids => {
    setActiveMenuID(ids)
    bread(ids)
    navigate(ids)
  }

  // 关闭顶部菜单显示
  const tabClose = ids => {
    const tabWithout = openMenuData.filter( openID => openID.url !== ids )
    const activeWithout = tabWithout.filter( activeID => activeID.url === activeMenuID )
    setOpenMenuData(tabWithout)
    if(tabWithout.length === 0){
      setActiveMenuID('/')
      navigate('/')
    } else if(activeWithout.length > 0){
        setActiveMenuID(activeMenuID)
    } else {
      setActiveMenuID(tabWithout[0]['url'])
      navigate(tabWithout[0]['url'])
    }
  }

  // 面包屑导航数据
  const bread = url => {
    const key = '/' + url.split('/')[1]
    if(key !== '/' && key !== '/home'){
      defaultData.find(item => {
        return item.children.length && item.children.find(child => {
          if(child.url === url){
            setBrad(child.title)
          }
          return false
        })
      })
      const menu = defaultData.find(item => item.url === key)
      setBradMenu(menu.title)
    } else {
      setBrad('')
      setBradMenu('')
    }
  }

  // 退出方法
  const onConfirm = () => {
    console.log('config');
  }

  //清除缓存
  const onClear = () => {
    console.log('clear');
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
          <span className="user-name">子不语</span>
          <span className="user-clear">
            <Popconfirm
            onConfirm={onClear}
              title="是否确认清除缓存？" 
              okText="确定" 
              cancelText="取消"
            >
              <ClearOutlined  /> 清除缓存
            </Popconfirm>
          </span>
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
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{ bradMenu }</Breadcrumb.Item>
            <Breadcrumb.Item>{ brad }</Breadcrumb.Item>
          </Breadcrumb>
          <Divider className="divider"/>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(RootLayout)
