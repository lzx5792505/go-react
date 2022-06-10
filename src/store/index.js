import React from 'react'

import SiteStore from './siteStore'
import UserStore from './userStore'
import MenuStore from './menuStore'
import GroupStore from './groupStore'
import LoginStore from './loginStore'
import ConfigStore from './configStore'

class RootStore {
    constructor() {
        this.siteStore = new SiteStore()
        this.menuStore = new MenuStore()
        this.userStore =  new UserStore()
        this.loginStore = new LoginStore()
        this.groupStore =  new GroupStore()
        this.configStore = new ConfigStore()
    }
}

const rootStore = new RootStore()
const rootContext = React.createContext(rootStore)
const useStore = () => React.useContext(rootContext)

export { useStore }