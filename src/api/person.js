import { service } from '../utils/http'

// 展示个人接口
export const apiGetPersonalInfo = param => {
  const { id } = param
  const url = `personal/findPersonalInfoByUserId?userId=${id}`
  return service.get(url)
}

// 编辑个人信息
export const apiUpdatePersonalInfo = param => {
  const url = `personal/updatePersonalInfo`
  return service.post(url, param)
}

