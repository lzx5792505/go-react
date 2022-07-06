import React, { useEffect, useRef, useState } from 'react'
import { Drawer, Button, Table } from 'antd';
import { useStore as rootStore } from '../../store'

export default function GroupRole({ activeVisible, onCloseModal, onFinishModal }) {
  const groupList = useRef([])
  const { menuStore } = rootStore()
  const [ selectedRowKeys, setSelectedRowKeys ] = useState('')

  //  处理数据
  useEffect(() => {
    const timeout = setTimeout(() => loadList(), 100)
    return () => clearTimeout(timeout)

    async function loadList() {
      const data = await menuStore.loadMenuList()
      if(data.length > 0){
        // 菜单数据
        const res = data.map(item => {
          item.key = item.id
          item.children.length  && item.children.map(it => {
            it.key = it.id
          })
          return item
        })
        groupList.current =res
      }
    }      
  }, [])
  
  const columns = [
    {
      title: '规则名称',
      dataIndex: 'title',
      key: 'title',
    },
  ];

  // 点击展开
  const [expKeys, setExpKeys] = useState(false);
  const onOpenMenu = () => {
    if(expKeys){
      setExpKeys(false)
    } else {
      let arr = []
      groupList.current.map(item => {
        arr.push(item.id)
        
      })
      setExpKeys(arr)
    }
  }

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
        <div className="d-flex">
          <div>
            <Button 
              onClick={ onOpenMenu }
              style={{ marginBottom:15}}
            >
              展开或折叠全部
            </Button>
          </div>
          <div>
            <Button 
              style={{ marginBottom: 15,  marginRight:15}} type="primary" 
              onClick={(e) => {e.preventDefault();e.stopPropagation();onFinishModal( selectedRowKeys )}}
            >
              提交
            </Button>
            <Button 
              style={{ marginBottom:15}} 
              onClick={(e) => {e.preventDefault();e.stopPropagation();onCloseModal()}}
            >
              关闭
            </Button>
            
          </div>
        </div>
        
        <Table
          columns={columns}
          rowSelection={{ ...rowSelection }}
          dataSource={ groupList.current }
          expandedRowKeys={ expKeys }
          pagination={false}
        />
      </Drawer>
    </>
  );
}
