import { makeAutoObservable } from 'mobx'
import { http } from './http'

export default class UserStore {
    userInfo = {}
    constructor() {
        makeAutoObservable(this)
    }

    // 用户列表
    getUserList = async () => {
        return await http.get('/users')
    }

    // 保存用户状态
    saveStatus = async (data, id) => {
       return await http.put('/users/status/' +  id, data)
    }
}

