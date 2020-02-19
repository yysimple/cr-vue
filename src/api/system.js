import { service } from '../utils/http'

// 查看验证设置
export const findVerification = () => {
  const url = `system/getInfo`
  return service.get(url)
}

// 修改验证设置
export const saveVerification = (param) => {
  const { key, value } = param
  const url = `system/modify?key=${key}&value=${value}`
  return service.post(url)
}
