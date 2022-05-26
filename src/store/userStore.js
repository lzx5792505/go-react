import { http } from './http'
import { makeAutoObservable } from 'mobx'
export default class UserStore {
    userInfo = {}
    constructor() {
        makeAutoObservable(this)
    }

    // 用户列表 & 搜索
    getUserList = async () => {
        return await http.get('/users')
    }

    // 保存用户
    saveUser = async data => {
        return await http.post('/users/store', data)
    }

    // 更新用户状态
    saveStatus = async (id, data) => {
        return await http.put(`/users/status/${id}`, data)
     }

    // 更新用户
    updateUser = async (id, data) => {
        return await http.put(`/users/update/${id}`, data)
    }

    // 删除
    delUser = async id => {
        return await http.delete(`/users/${id}`)
    }
}

