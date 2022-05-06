import React, { useEffect } from 'react'
import { Drawer, Form, Button, Input, Radio, Select } from 'antd';

export default function SiteMenuEdit({ menuID, activeVisible, onCloseModal, onFinishModal }) {
  const { Option } = Select
  const [form] = Form.useForm()

  // 数据回填
  useEffect(() => {
    if(menuID){
      form.setFieldsValue(
        {
          user:'测试数据',
          name:'测试名称',
          password:'123456',
          group_id:'1',
          status:2,
        }
      )
    }else {
      form.setFieldsValue({
        user:'',
        name:'',
        password:'',
        group_id:'',
        status:2,
      })
    }
  },[ menuID ])

  return (
    <>
      <Drawer
        title={menuID ? '编辑菜单' : '新增菜单'}
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
          initialValues={{ status: 2, menu: 2 }}
          validateTrigger={['onBlur','onChange']}
        >
          <Form.Item
            name="pid"
            label="所属层级"
            rules={[{ required: true, message: '请选择所属层级' }]}
          >
            <Select placeholder="请选择所属层级">
              <Option value="1" key="1">所属层级1</Option>
              <Option value="2" key="2">所属层级2</Option>
            </Select>
          </Form.Item>
    
          <Form.Item
            name="title"
            label="名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item
            name="url"
            label="URL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            rules={[{ required: true, message: '请输入URL' }]}
          >
            <Input placeholder="请输入URL" />
          </Form.Item>
          <Form.Item
            name="icon"
            label="图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标"
          >
            <Input placeholder="请输入图标" />
          </Form.Item>
          <Form.Item
            name="sort"
            label="排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序"
          >
            <Input placeholder="请排序" />
          </Form.Item>
          
          <Form.Item 
            name="menu"
            label="类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型"
          >
            <Radio.Group>
              <Radio value={1}>行为</Radio>
              <Radio value={2}>菜单</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item 
            name="status"
            label="是&nbsp;否&nbsp;禁&nbsp;用"
          >
            <Radio.Group>
              <Radio value={1}>禁用</Radio>
              <Radio value={2}>开启</Radio>
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
