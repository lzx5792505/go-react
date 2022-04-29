const defaultData = [
    {
      id: '1',
      title: '首页',
      url: '/home',
      icon: 'HomeOutlined',
      children:[
          {
            id: '2',
            title: '数据概要',
            url: '/',
            icon: 'PieChartOutlined',
          },
          {
            id: '3',
            title: '系统信息',
            url: '/home/info',
            icon: 'SettingOutlined',
          }
      ]
    },
    {
        id: '4',
        title: '用户管理',
        url: '/user',
        icon: 'HomeOutlined',
        children:[
            {
              id: '5',
              title: '用户列表',
              url: '/user/user',
              icon: 'UserSwitchOutlined',
            },
            {
              id: '6',
              title: '用户组列表',
              url: '/user/groupList',
              icon: 'UsergroupAddOutlined',
            }
        ]
    },
    {
        id: '7',
        title: '系统管理',
        url: '/site',
        icon: 'SettingOutlined',
        children:[
            {
              id: '9',
              title: '菜单管理',
              url: '/site/site',
              icon: 'MenuOutlined',
            },
            {
              id: '10',
              title: '日志管理',
              url: '/site/log',
              icon: 'DiffOutlined',
            },
            {
              id: '11',
              title: '站点配置',
              url: '/site/config',
              icon: 'FolderOpenOutlined',
            }
        ]
    }
  ]
  
  export default defaultData