/**
 * Api配置
 */

import axios from 'axios'
import router from '../router'
import store from '../store'


axios.defaults.timeout = 20000;
axios.defaults.baseURL = "http://59.110.239.240";
// http request 拦截器
axios.interceptors.request.use(
    config => {
        //if (store.state.token) {
        // config.headers.Authorization = `token ${store.state.token}`;
        //}
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    }
);
// 添加实例方法
export default axios;