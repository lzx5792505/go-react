import { http } from './http'
import { makeAutoObservable } from 'mobx'
import { setStorage, getStorage, removeStorage, tokenKey } from '@/utils'

export default class LoginStore{   
    token = getStorage(tokenKey) ? getStorage(tokenKey) :''
    constructor() {
        makeAutoObservable(this)
    }

    getToken = async ({mobile, code}) => {
        const res = await http.post('/',{
            mobile,
            code
        })
        this.token = res.data.token
        setStorage(tokenKey, res.data.token)
    }

    clearToken = () => {
        this.token = ''
        removeStorage(tokenKey)
    }
}