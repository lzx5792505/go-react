import React, { useEffect } from 'react'
import { http } from '../../store/http'
import { Drawer, Form, Button, Input, Radio, Select } from 'antd';

export default function UserEdit({ userID, activeVisible, onCloseModal, onFinishModal }) {
  const { Option } = Select
  const [form] = Form.useForm()
  
  useEffect(() => {
    const loadDetail = async () => {
      const res = await http.get(`/users/one/${userID}`)
      const data = res.data
      // 表单数据回填
      form.setFieldsValue({ 
        ...data, 
      })
    }
    // 编辑状态才能发送
    if(userID){
      loadDetail()
    } else {
      form.setFieldsValue({
        user:'',
        name:'',
        password:'',
        group_id:'',
        status:2,
      })
    }
  },[ userID ])

  return (
    <>
      <Drawer
        title={userID ? '编辑用户' : '新增用户'}
        width={720}
        placement="left"
        closable={false}
        getContainer={false}
        destroyOnClose={true}
        onClose={ onCloseModal }
        visible={ activeVisible }
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form 
          form={form}
          onFinish={ onFinishModal }
          initialValues={{ status: 2 }}
          validateTrigger={['onBlur','onChange']}
        >
          <Form.Item
            name="user"
            label="账&nbsp;&nbsp;&nbsp;&nbsp;号"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input placeholder="输入账号" />
          </Form.Item>
    
          <Form.Item
            name="name"
            label="昵&nbsp;&nbsp;&nbsp;&nbsp;称"
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input placeholder="请输入昵称" />
          </Form.Item>
          {
            !userID &&
            <Form.Item
              name="password"
              label="密&nbsp;&nbsp;&nbsp;&nbsp;码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password  placeholder="请输入密码" />
            </Form.Item>
          }
          <Form.Item
            label="所属组"
            name="group_id"
            rules={[{ required: true, message: '请选择所属组' }]}
          >
            <Select placeholder="请选择所属组">
              <Option value="1" key="1">所属组1</Option>
              <Option value="2" key="2">所属组2</Option>
            </Select>
          </Form.Item>
          <Form.Item 
            name="status"
            label="是否禁用"
          >
            <Radio.Group>
              <Radio value={1}>开启</Radio>
              <Radio value={2}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button onClick={(e) => {e.preventDefault();e.stopPropagation();onCloseModal()}}>关闭</Button>
            <Button type="primary" htmlType="submit" style={{ marginLeft:10 }}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
