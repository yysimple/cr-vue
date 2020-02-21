import { service } from '../utils/http'

// 登录
export const apiLogin = param => {
  const { username, password } = param
  const url = `user/login?username=${username}&password=${password}`
  return service.post(url)
}
