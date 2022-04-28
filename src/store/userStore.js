import { makeAutoObservable } from 'mobx'
import { http } from './http'

export default class UserStore {
    userInfo = {}
    constructor() {
        makeAutoObservable(this)
    }

    getUserInfo = async () => {
        const res = await  http.get('/')
        this.userInfo =  res.data
    }
}

