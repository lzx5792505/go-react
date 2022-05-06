import React from 'react'
import { Drawer, Form, Button, Table } from 'antd';

export default function GroupRole({ activeVisible, onCloseModal, onFinishModal }) {
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
      name: 'John Brown sr.',
      children: [
        {
          key: 11,
          name: 'John Brown',
        },
        {
          key: 12,
          name: 'John Brown jr.',
          children: [
            {
              key: 121,
              name: 'Jimmy Brown',
            },
          ],
        },
        {
          key: 13,
          name: 'Jim Green sr.',
          children: [
            {
              key: 131,
              name: 'Jim Green',
              children: [
                {
                  key: 1311,
                  name: 'Jim Green jr.',
                },
                {
                  key: 1312,
                  name: 'Jimmy Green sr.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  return (
    <>
      <Drawer
        title="访问规则"
        width={720}
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
          <Button type="primary" onClick={(e) => {e.preventDefault();e.stopPropagation();onFinishModal()}} style={{ marginLeft:10 }}>
            提交
          </Button>
      </Drawer>
    </>
  );
}
