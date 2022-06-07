import { http } from './http'
import { makeAutoObservable } from 'mobx'
import createTreeData from '../utils/helper'

export default class MenuStore {
    menuList = []
    constructor() {
        makeAutoObservable(this)
    }

    // 列表
    getMenuList = async () => {
        return await http.get('/menu')
    }

    loadMenuList = async () => {
        const res = await http.get('/menu')
        const list = createTreeData(res.data)
        this.menuList = list

        return list
    }

}

