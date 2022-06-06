import { http } from './http'
import { makeAutoObservable } from 'mobx'
export default class MenuStore {
    constructor() {
        makeAutoObservable(this)
    }

    // 列表
    getMenuList = async () => {
        return await http.get('/menu')
    }

}

