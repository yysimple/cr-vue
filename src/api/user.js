import { service } from '../utils/http'

// 获取用户列表
export const apiGetUsers = () => {
  const url = `user/findAll`
  return service.get(url)
}

// 添加用户
export const apiAddUser = param => {
  const { username, password } = param
  // const url = `user/save?username=${username}&password=${password}`
  const url = `user/save`
  return service.post(url, param)
}

// 编辑用户
export const apiEditUser = param => {
  const { username } = param
  const url = `user/updateUser?username=${username}`
  return service.post(url)
}

// 删除用户
export const apiDeleteUser = param => {
  const { id } = param
  const url = `user/deleteById?id=${id}`
  return service.post(url)
}

