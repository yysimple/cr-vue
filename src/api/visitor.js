import { service } from '../utils/http'

// 获取所有访客记录
export const apiGetVisitors = () => {
  const url = `visitor/findAllVisitor`
  return service.get(url)
}

