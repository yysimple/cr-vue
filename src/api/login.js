import { service } from '../utils/http'

// 回收企业登录
export const apiRecycleLogin = param => {
  const { username, password } = param
  const url = `recycle/login?username=${username}&password=${password}`
  return service.post(url)
}

// 超级管理员登录
export const apiAdminLogin = param => {
  const { username, password } = param
  const url = `user/login?username=${username}&password=${password}`
  return service.post(url)
}
