import React, { useEffect } from 'react'
import { http } from '../../store/http'
import { Drawer, Form, Button, Input, Radio, Select } from 'antd';

export default function SiteMenuEdit({ menuID, activeVisible, onCloseModal, onFinishModal }) {
  const { Option } = Select
  const [form] = Form.useForm()

  // 数据回填
  useEffect(() => {
    const loadDetail = async () => {
      const res = await http.get(`/menu/one/${menuID}`)
      const data = res.data
      // 表单数据回填
      form.setFieldsValue({ 
        ...data, 
      })
    }

    if(menuID){
      loadDetail()
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
          initialValues={{ status: 1, menu: 1 }}
          validateTrigger={['onBlur','onChange']}
        >
          <Form.Item
            name="pid"
            label="所属层级"
            rules={[{ required: true, message: '请选择所属层级' }]}
          >
            <Select placeholder="请选择所属层级">
              <Option value="0" key="0">顶层菜单</Option>
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
            name="name"
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
              <Radio value={1}>菜单</Radio>
              <Radio value={2}>行为</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item 
            name="status"
            label="是&nbsp;否&nbsp;禁&nbsp;用"
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
