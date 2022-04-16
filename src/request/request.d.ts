import {  Method , AxiosResponse} from  'axios'
interface Data{
    httpCode: number
    message: string
    result: any
    success: boolean
}

export  declare type RequestInstance = (method: Method, url: string, params?: any) => Promise<AxiosResponse<Data>>
