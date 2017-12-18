import axios from 'axios'
import {apiDomain} from '@/config'

// axios.defaults.withCredentials = true

const instance = axios.create({
    baseURL: apiDomain
    // withCredentials: true
    // transformResponse: [function (data) {
    //     // Do whatever you want to transform the data
    //     console.log('呵呵')
    //     console.log(data)
    //     return data;
    // }],
})

export default instance
