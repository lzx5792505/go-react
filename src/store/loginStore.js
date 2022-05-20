import { http } from './http'
import { makeAutoObservable } from 'mobx'
import { setStorage, getStorage, removeStorage, tokenKey } from '@/utils'

export default class LoginStore{   
    token = getStorage(tokenKey) ? getStorage(tokenKey) : ''
    constructor() {
        makeAutoObservable(this)
    }

    // 登录
    getToken = async ({ captcha_id, captcha_answer, login_id,password }) => {
        const res = await http.post('/auth/login',{
            captcha_id,
            captcha_answer,
            login_id,
            password
        })
        this.token = res.token
        setStorage(tokenKey, res.token)

        // 本地开发
        // this.token = '11111'
        // setStorage(tokenKey, this.token)
    }

    // 验证码
    getLoginCode = () => {
        http.post('/auth/verify/code')
    }

    // 退出登录
    clearToken = () => {
        this.token = ''
        removeStorage(tokenKey)
    }
}