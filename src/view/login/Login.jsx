import React, { useState, useEffect } from 'react'
import { useStore as rootStore } from '@/store'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, message } from 'antd'

import '@/assets/scss/login.scss'
import '@/assets/js/canvas.js'

export default function Login () {
  const { Search } =  Input
  // 本地开发设置默认值
  const { loginStore } = rootStore()
  const navigate = useNavigate()
  const [ codeData, setCodeData ] = useState('')

  const  onFinish = async val => {
    const { username, password, code } = val
    // 所以表单选内容
    try{
      await loginStore.getToken({
        username,
        password,
        code
      })
      navigate('/',{replace:true})
      message.success('登录成功')
    } catch(e) {
      message.error(e.response?.data?.message || '登录失败')
    }
  }

  useEffect(() => {
    setCodeData('222222')
  },[])
  
  const onSearchCode = () => {
    setCodeData('123412')
  }

  return (
    <div className='login'>
      <canvas className="login-cav" width="100%" height="100%"></canvas>
      <Card className='login-container'>
        <div className="login-title">
            <span>管理员登录</span>
        </div>
        <Form
          initialValues={{
            username:'admin',
            password:'123123',
            code:'222222'
          }}
          validateTrigger={['onBlur','onChange']}
          onFinish={ onFinish }
        >
          <Form.Item
            name="username"
            rules={[
              { 
                required: true, 
                message: '请输入账号!' 
              }
            ]}
          >
              <Input size='large' placeholder='请输入账号' />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { 
                required: true, 
                message: '请输入密码!' 
              }
            ]}
          >
              <Input.Password size='large' placeholder='请输入密码' />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { 
                required: true, 
                message: '请输入验证码!' 
              },
              {
                len:6,
                message:'验证码6个字符',
                validateTrigger:'onBlur'
              }
            ]}
          >
              <Search
                placeholder="输入验证"
                enterButton={ codeData }
                size="large"
                className="search-btn"
                onSearch={ onSearchCode }
              />
          </Form.Item>
          <Form.Item>
              <Button type='primary' htmlType='submit' size='large' block>登录</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
