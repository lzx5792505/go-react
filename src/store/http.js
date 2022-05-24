import axios from "axios"
import { getStorage, tokenKey, history } from '@/utils'

const http = axios.create({
    baseURL: 'http://localhost:3080/api/v1',
    timeout: 5000
})

http.interceptors.request.use((config) => {
     //认证接口
    const token = getStorage(tokenKey);
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config
}, err => {
    return Promise.reject(err)
})

http.interceptors.response.use(res => {
    return res.data ? res.data : res;
}, err => {
    if(err.response.status === 401 ){
        history.push('./login')
    }
    let msg = err.response.message ? err.response.message : err
    return Promise.reject(msg)
})

export { http }