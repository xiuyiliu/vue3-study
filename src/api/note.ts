import prefix from '@/config/prefix.ts'
import http from '@/config/http'

export default {
  createNote (params: any) {
    return http.post(`${prefix.api}note/add`, params)
  },
  findAllNote () {
    return http.get(`${prefix.api}note/findAll`)
  },
  findOneNote (params: any) {
    return http.post(`${prefix.api}note/findOne`, params)
  },
  removeNote (params: any) {
    return http.post(`${prefix.api}note/remove`, params)
  }
}
