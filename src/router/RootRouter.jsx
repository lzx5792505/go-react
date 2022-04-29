import React from 'react'
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { history } from '@/utils'
import AuthRoute from '@/hooks/useAuthRoute'

import Login  from './../view/login/Login'
import RootLayout from './../view/layout/Layout'
import Home from './../view/home/Home'
import SiteInfo from '../view/home/SiteInfo'
import Article from './../view/article/ArticleList'
import User  from './../view/user/UserList'
import UserEdit  from './../view/user/UserEdit'
import GroupList from './../view/user/GroupList'
import GroupEdit from './../view/user/GroupEdit'
import SiteConfig from './../view/setting/SiteConfig'
import SiteMenu from './../view/setting/SiteMenu'
import SiteLog from './../view/setting/SiteLog'

export default function RootRouter() {
  return (
    <HistoryRouter history={history}>
        <div className='App'>
          <Routes>
            <Route path='/' element={
              <AuthRoute> 
                <RootLayout />
              </AuthRoute>
            }>
              {/* 首页 */}
              <Route index element={<Home />}></Route>
              <Route path='/home/info' element={<SiteInfo />}></Route>
              {/* 用户 */}
              <Route path='/user/user' element={<User />}></Route>
              <Route path='/user/userEdit' element={<UserEdit />}></Route>
              <Route path='/user/groupList' element={<GroupList />}></Route>
              <Route path='/user/groupEdit' element={<GroupEdit />}></Route>
              {/* 系统 */}
              <Route path='/site/site' element={<SiteMenu />}></Route>
              <Route path='/site/log' element={<SiteLog />}></Route>
              <Route path='/site/config' element={<SiteConfig />}></Route>
              {/* 内容 */}
              <Route path='/article' element={<Article />}></Route>
            </Route>
            {/* 登录 */}
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </div>
    </HistoryRouter>
  )
}
