import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Form, Button, Input, Space } from 'antd'

function SiteConfig () {
  const [ form ] = Form.useForm()
  // 表单数据
  const onFinish = value => {
    const { title, name, icp, copyright } = value
    console.log(title, name, icp, copyright);
  }

  return (
    <div>
      <Card
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: '' }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="网站标题"
            name="title"
            rules={[{ required: true, message: '请输入网站标题' }]}
          >
            <Input placeholder="请输入网站标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="网站名称"
            name="name"
            rules={[{ required: true, message: '请输入网站名称' }]}
          >
            <Input placeholder="请输入网站名称" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="备案号"
            name="icp"
            rules={[{ required: true, message: '请输入备案号' }]}
          >
            <Input placeholder="请输入备案号" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="版权信息"
            name="copyright"
            rules={[{ required: true, message: '请输入版权信息' }]}
          >
            <Input placeholder="请输入版权信息" style={{ width: 400 }} />
          </Form.Item>
          
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                立即提交
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(SiteConfig)
