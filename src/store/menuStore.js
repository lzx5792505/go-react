import { http } from './http'
import { makeAutoObservable } from 'mobx'
import { createTreeData } from '@/utils'

export default class MenuStore {
    constructor() {
        makeAutoObservable(this)
    }

    loadMenuList = async () => {
        const res = await http.get('/menu')
        const list = createTreeData(res.data)

        return list
    }

}

