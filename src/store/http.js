import axios from "axios"
import { getStorage, tokenKey, history } from '@/utils'

const http = axios.create({
    baseURL: 'http://www.baidu.com',
    timeout: 5000
})

http.interceptors.request.use((config) => {
     //认证接口
    const token = getStorage(tokenKey);
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

http.interceptors.response.use((res) => {
    return res.data
}, (err) => {
    if(err.response.status === 401 ){
        history.push('./login')
    }
    return Promise.reject(err)
})

export { http }