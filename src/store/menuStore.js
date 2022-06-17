import { http } from './http'
import { makeAutoObservable } from 'mobx'
import { createTreeData } from '@/utils'

export default class MenuStore {
    constructor() {
        makeAutoObservable(this)
    }

    // 列表
    loadMenuList = async () => {
        const res = await http.get('/menu')
        const list = createTreeData(res.data, 0)

        return list
    }

    // 保存
    saveMenu = async data => {
        return await http.post('/menu/store', data)
    }

    // 更新
    updateMenu  =async (id, data) => {
        return await http.put(`/menu/update/${id}`, data)
    }

    // 删除
    delMenu = async id => {
        return await http.delete(`/menu/${id}`)
    }

}

