import React, { useState } from 'react'
import { Drawer, Button, Table } from 'antd';
import { useStore as rootStore } from '../../store'

export default function GroupRole({ activeVisible, onCloseModal, onFinishModal }) {
  // mobx 用户方法
  const { menuStore } = rootStore()
  const [ selectedRowKeys, setSelectedRowKeys ] = useState('')
    
  const columns = [
    {
      title: '规则名称',
      dataIndex: 'title',
      key: 'title',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(`${selectedRowKeys}`)
    },
  };
  
  return (
    <>
      <Drawer
        title="访问规则"
        width={ 720 }
        placement="left"
        closable={false}
        getContainer={false}
        destroyOnClose={true}
        onClose={ onCloseModal }
        visible={ activeVisible }
        bodyStyle={{ paddingBottom: 80 }}
      >
     
          <Table
            columns={columns}
            rowSelection={{ ...rowSelection }}
            dataSource={ menuStore.menuList }
          />
          <Button onClick={(e) => {e.preventDefault();e.stopPropagation();onCloseModal()}}>关闭</Button>
          <Button type="primary" onClick={(e) => {e.preventDefault();e.stopPropagation();onFinishModal( selectedRowKeys )}} style={{ marginLeft:10 }}>
            提交
          </Button>
      </Drawer>
    </>
  );
}
