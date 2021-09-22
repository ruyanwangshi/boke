import {  Method , AxiosResponse} from  'axios'

export  declare type RequestInstance = (method: Method, url: string, params?: any) => Promise<AxiosResponse>
