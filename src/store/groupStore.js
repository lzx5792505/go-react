import { http } from './http'
import { makeAutoObservable } from 'mobx'
export default class GroupStore {
    userInfo = {}
    constructor() {
        makeAutoObservable(this)
    }

    // 搜索
    getGroupList = async data => {
        return await http.get('/group?search=' + data.search)
    }

    // 保存用户
    saveGroup = async data => {
        return await http.post('/group/store', data)
    }

    // 保存访问规则
    saveRule = async (id, data) => {
        return await http.post(`/group/store/rule/${id}`, data)
    }

    // 更新用户组状态
    saveStatus = async (id, data) => {
        return await http.put(`/group/status/${id}`, data)
    }

    // 更新
    updateGroup = async (id, data) => {
        return await http.put(`/group/update/${id}`, data)
    }

    // 删除
    delGroup = async id => {
        return await http.delete(`/group/${id}`)
    }
}

