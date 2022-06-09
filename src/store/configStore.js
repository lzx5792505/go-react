import { http } from './http'
import { makeAutoObservable } from 'mobx'

export default class ConfigStore {
    constructor() {
        makeAutoObservable(this)
    }

    // 列表
    getConfigList = async () => {
        return await http.get('/config')
    }

    // 保存
    saveConfig = async data => {
        return await http.post('/config/store', data)
    }

    // 更新
    updateConfig = async (id, data) => {
        return await http.put(`/config/${id}`, data)
    }
}

