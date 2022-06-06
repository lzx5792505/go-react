import React, { useEffect, useState } from 'react'
import { Drawer, Button, Table } from 'antd';
import { useStore as rootStore } from '../../store'
import  createTreeData  from '../../utils/helper'

export default function GroupRole({ activeVisible, onCloseModal, onFinishModal }) {
  // mobx 用户方法
  const { menuStore } = rootStore()
  const [ dataList, setDataList ] =  useState({})
  const [ selectedRowKeys, setSelectedRowKeys ] = useState('')

  // 初始化数据 ( 处理发送2次的情况 )
  useEffect(() => {
    const timeout = setTimeout(() => loadMenu(), 100)
    return () => clearTimeout(timeout)

    async function loadMenu() {
      await menuStore.getMenuList().then(res => {
        const { data } = res
        const list = createTreeData(data)
        setDataList(list)
      })
    }
  },[])
    
  const columns = [
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  console.log(dataList);
  const data = [
    {
      id: 1, pid: 0, key: 1, name: '首页', 
      children: [
        {
          id: 2, pid: 1, key: 2, name: '数据概要'
        },
        {
          id: 3, pid: 1, key: 3, name: '系统信息',
        },
      ],
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
            dataSource={ data }
          />
          <Button onClick={(e) => {e.preventDefault();e.stopPropagation();onCloseModal()}}>关闭</Button>
          <Button type="primary" onClick={(e) => {e.preventDefault();e.stopPropagation();onFinishModal( selectedRowKeys )}} style={{ marginLeft:10 }}>
            提交
          </Button>
      </Drawer>
    </>
  );
}
