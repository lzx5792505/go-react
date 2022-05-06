// import { http } from './http'
import { makeAutoObservable } from 'mobx'
import { setStorage, getStorage, removeStorage, tokenKey } from '@/utils'

export default class LoginStore{   
    token = getStorage(tokenKey) ? getStorage(tokenKey) :''
    constructor() {
        makeAutoObservable(this)
    }

    getToken = async ({ username, password, code }) => {
        // const res = await http.post('/',{
        //     username,
        //     password,
        //     code
        // })
        // this.token = res.data.token
        // setStorage(tokenKey, res.data.token)

        // 开发静态页面用例
        this.token = '123123'
        setStorage(tokenKey, this.token)
    }

    clearToken = () => {
        this.token = ''
        removeStorage(tokenKey)
    }
}