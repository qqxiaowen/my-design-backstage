import axios from 'axios'
import { Message } from 'element-ui';
import router from '@/router'

const env = process.env.NODE_ENV
const baseURL = env == 'development' ? '/api' : '/'

const instance = axios.create({
    baseURL,
    timeout: 15000,
});
const xhr ={
    get(url,data,config){
        return new Promise((resolve,rejects) => {
            instance.get(url,{params:data,...config}).then(res =>{
                if(res.data.code == 401){
                    console.log('登录状态失效')
                    Message.warning('登录状态失效')
                    router.push('/login')
                }
                
                resolve(res.data)
            }).catch(err => {
                rejects(err)
            })
        })
    },
    fetch(url,data,config,methods){
        return new Promise((resolve,rejects) => {
            instance[methods](url,data,config).then(res =>{
                if(res.data.code == 401){
                    console.log('登录状态失效')
                    Message.warning('登录状态失效')
                    router.push('/login')
                }
                resolve(res.data)
            }).catch(err => {
                rejects(err)
            })
        })
    },
    post(url,data,config){
        return this.fetch(url,data,config,'post')
    },
    delete(url,data,config){
        return this.fetch(url,data,config,'delete')
    },
    put(url,data,config){
        return this.fetch(url,data,config,'put')
    }
}
export const $axios = xhr