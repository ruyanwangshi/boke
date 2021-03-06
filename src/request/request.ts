import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios'

const baseUrl = 'http://192.168.31.44:3001'
// const baseUrl = 'http://192.168.144.210:3001'

const Instance: AxiosInstance = Axios.create({
  baseURL: baseUrl,
  timeout: 5000,
})

Instance.interceptors.request.use((request) => {
  // console.log(request)
  return request
})

Instance.interceptors.response.use((response) => {
  console.log(response)
  return response
})


interface Result{
  httpCode: number
  message: string
  result: any
  success: boolean
}

export function RequestInstance(method: Method, url: string, params?: any): Promise<AxiosResponse<Result>> {
  const Config = {
    url: url,
    method: method,
    params: params
  }

  if (typeof method === 'string' && method == 'post') {
    Config['data'] = params
  } else {
    Config['params'] = params
  }
  return Instance.request(Config)
}
