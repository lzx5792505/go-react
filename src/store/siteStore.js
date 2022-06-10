import { http } from './http'
import { makeAutoObservable } from 'mobx'

export default class siteStore {
    constructor() {
        makeAutoObservable(this)
    }

    getLogList = async () => {
        return await http.get('/log')
    }
    // 列表
    getSearchList = async data => {
        let created_at = data.created_at ? data.created_at : ''
        let updated_at = data.updated_at ? data.updated_at : ''

        return await http.get('/log?page=' + data.page + '&per_page=' + data.per_page + '&search=' + data.search + '&created_at=' + created_at + '&updated_at=' + updated_at)
    }
}

