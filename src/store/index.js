import React from "react"
import LoginStore from "./loginStore"
import UserStore from "./userStore"
import GroupStore from "./groupStore"

class RootStore {
    constructor() {
        this.loginStore = new LoginStore()
        this.userStore =  new UserStore()
        this.groupStore =  new GroupStore()
    }
}

const rootStore = new RootStore()
const rootContext = React.createContext(rootStore)
const useStore = () => React.useContext(rootContext)

export { useStore }