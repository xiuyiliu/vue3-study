import prefix from '@/config/prefix.ts'
import http from '@/config/http'

export default {
  login (params: any) {
    return http.post(`${prefix.api}user/login`, params)
  }
}
