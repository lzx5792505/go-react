import React from "react"
import UserStore from "./userStore"
import MenuStore from "./menuStore"
import GroupStore from "./groupStore"
import LoginStore from "./loginStore"

class RootStore {
    constructor() {
        this.menuStore = new MenuStore()
        this.userStore =  new UserStore()
        this.loginStore = new LoginStore()
        this.groupStore =  new GroupStore()
    }
}

const rootStore = new RootStore()
const rootContext = React.createContext(rootStore)
const useStore = () => React.useContext(rootContext)

export { useStore }