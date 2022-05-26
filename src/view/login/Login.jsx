import React, { useState, useEffect } from 'react'
import { useStore as rootStore } from '@/store'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, message, Image, Col, Row } from 'antd'
import { http } from '../../store/http'

import '@/assets/scss/login.scss'
import '@/assets/js/canvas.js'

export default function Login () {
  const { loginStore } = rootStore()
  // 验证码
  const [value, setValue] = useState('')
  const [ codeData, setCodeData ] = useState({
    code:'',
    id:'',
  })
  const navigate = useNavigate()

  const  onFinish = async val => {
    const { login_id, password } = val
    // 表单数据
    try{
      await loginStore.getToken({
        captcha_id : codeData.id,
        captcha_answer : value,
        login_id,
        password
      })
      navigate('/',{replace:true})
      message.success('登录成功')
    } catch(e) {
      message.error(e.response?.data?.message || '登录失败')
    }
  }

  // 初始化验证码
  useEffect(() => {
    const timeout = setTimeout(() => loadCode(), 100)
    return () => clearTimeout(timeout)
    async function loadCode() {
      await http.post('/auth/verify/code').then(res => {
        setCodeData({
          code:res.captcha_image,
          id:res.captcha_id
        })
      })
    }
  },[])

  // 获取填入的验证码
  const onChangeCode = val => {
    setValue(val.target.value)
  }

  // 重置验证码
  const onSearchCode = async () => {
    const res = await http.post('/auth/verify/code')
    setCodeData({
      code:res.captcha_image,
      id:res.captcha_id
    })
  }

  return (
    <div className='login'>
      {/* 背景离子效果 */}
      <canvas id="log-cav" className="login-cav" width="100%" height="100%"></canvas>
      {/* 表单 */}
      <Card className='login-container'>
        <div className="login-title">
            <span>管理员登录</span>
        </div>
        <Form
          initialValues={{
            login_id:'admin',
            password:'123123',
          }}
          validateTrigger={['onBlur','onChange']}
          onFinish={ onFinish }
        >
          <Form.Item
            name="login_id"
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
          <Form.Item>
            <Input.Group size="large">
              <Row gutter={24} style={{ marginLeft: "0px",marginRight:"0px" }}>
                <Col span={16} style={{ paddingLeft: "0px", paddingRight:"0px" }}>
                  <Input value={ value } onChange={ onChangeCode } size='large' placeholder='输入验证码'/>
                </Col>
                <Col span={8} style={{ paddingLeft: "0px", paddingRight:"0px" }}>
                  <Button onClick={(e) => {e.preventDefault();e.stopPropagation();onSearchCode()}} style={{ height: "40.14px",backgroundColor:"#fff" }}>
                    <Image src={ codeData.code } />
                  </Button>
                </Col>
              </Row>
            </Input.Group>
          </Form.Item>
          <Form.Item>
              <Button type='primary' htmlType='submit' size='large' block>登录</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
