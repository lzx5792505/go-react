import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore as rootStore} from '../../store'
import { Card, Form, Button, Input, Space, message } from 'antd'

function SiteConfig () {
  const [ form ] = Form.useForm()
  const { configStore } = rootStore()
  // 获取ID
  const configID = useRef('')

  // 初始化数据
  useEffect(() => {
    const timeout = setTimeout(() => loadList(), 100)
    return () => clearTimeout(timeout)

    async function loadList() {
      await configStore.getConfigList().then(res => {
        configID.current = res.data[0]['id']
        const data = res.data
        form.setFieldsValue({ 
          ...data[0], 
        })
      })
    }
  },[])

  // 表单数据
  const onFinish = value => {
    const { title, name, icp, copyright } = value

    const _params = {}
    _params.title = title
    _params.name = name
    _params.icp = icp
    _params.copyright = copyright

    if(configID.current){
      configStore.updateConfig(configID.current, _params)
    } else {
      configStore.saveConfig(_params)
    }

    message.success('保存成功')
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
