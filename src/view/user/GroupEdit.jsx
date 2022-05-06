import React, { useEffect } from 'react'
import { Drawer, Form, Button, Input } from 'antd';

export default function GroupEdit({ groupID, activeVisible, onCloseModal, onFinishModal }) {
  const [form] = Form.useForm()

  // 数据回填
  useEffect(() => {
    if(groupID){
      form.setFieldsValue(
        {
          title:'测试名称',
        }
      )
    }else {
      form.setFieldsValue({
        title:'',
      })
    }
  },[ groupID ])

  return (
    <>
      <Drawer
        title={groupID ? '编辑用户组' : '新增用户组'}
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
          onFinish={onFinishModal}
          initialValues={{ status: 2 }}
          validateTrigger={['onBlur','onChange']}
        >
          <Form.Item
            name="title"
            label="用户组名"
            rules={[{ required: true, message: '请输入用户组名' }]}
          >
            <Input placeholder="请输入用户组名" />
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
