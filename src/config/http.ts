import Axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'

// 在配置axios实例时，需要在切面配置接口请求的loading，在项目层面上防止在请求接口时的用户操作。
// 为了防止同时调用多个接口导致生成多个loading实例的问题，需要做出以下配置：

const loadingOptions = {
  text: '加载中...'
}
interface LoadingInstanceObj {
  loadingInstance: any;
  loadingCount: number;
  addLoading(): void;
  closeLoading(): void;
}
const loadingInstanceObj: LoadingInstanceObj = {
  loadingInstance: null,
  loadingCount: 0,
  addLoading () {
    this.loadingInstance = ElLoading.service(loadingOptions)
    this.loadingCount++
  },
  closeLoading () {
    this.loadingCount--
    if (this.loadingCount <= 0) {
      this.loadingInstance && this.loadingInstance.close()
      this.loadingCount = 0
    }
  }
}

const service = Axios.create({
  timeout: 20000
})

// 前置拦截器（发起请求之前的拦截）
service.interceptors.request.use(
  (request) => {
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    loadingInstanceObj.addLoading()
    return request
  },
  (error) => {
    loadingInstanceObj.closeLoading()
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
service.interceptors.response.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    loadingInstanceObj.closeLoading()
    return response.data
  },
  (error) => {
    loadingInstanceObj.closeLoading()
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
      console.error('[Axios Error]', error.response)
    } else {
      ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
  }
)

export default service
