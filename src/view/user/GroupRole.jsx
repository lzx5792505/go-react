import React, { useState } from 'react'
import { Drawer, Button, Table } from 'antd';

export default function GroupRole({ activeVisible, onCloseModal, onFinishModal }) {

  const [ selectedRowKeys, setSelectedRowKeys ] = useState('')
  const columns = [
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  
  const data = [
    {
      key: 1,
      name: '111',
      children: [
        {
          key: 11,
          name: '222',
        },
        {
          key: 12,
          name: '333',
          children: [
            {
              key: 121,
              name: '444',
            },
          ],
        },
        {
          key: 13,
          name: '555',
          children: [
            {
              key: 131,
              name: '666',
              children: [
                {
                  key: 1311,
                  name: '777',
                },
                {
                  key: 1312,
                  name: '888',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: '999',
      age: 32,
      address: '101010',
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
            dataSource={data}
          />
          <Button onClick={(e) => {e.preventDefault();e.stopPropagation();onCloseModal()}}>关闭</Button>
          <Button type="primary" onClick={(e) => {e.preventDefault();e.stopPropagation();onFinishModal( selectedRowKeys )}} style={{ marginLeft:10 }}>
            提交
          </Button>
      </Drawer>
    </>
  );
}
