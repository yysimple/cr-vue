import { service } from '../utils/http'

// 获取电脑列表
export const apiGetComputers = () => {
  const url = `computer/findAllComputer`
  return service.get(url)
}

// 获取电脑列表 通过用户id
export const apiGetComputersByUser = (id) => {
  const url = `computer/findComputerByUserId?userId=${id}`
  return service.get(url)
}

// 添加电脑
export const apiAddComputer = param => {
  const url = `computer/addComputer`
  return service.post(url, param)
}

// 添加电脑
export const apiBuyComputer = (computerId, userId) => {
  const url = `computer/buyComputer?computerId=${computerId}&userId=${userId}`
  return service.post(url)
}

// 编辑电脑状态
export const apiEditComputer = param => {
  const url = `computer/updateComputer`
  return service.post(url, param)
}

// 删除电脑
export const apiDeleteComputer = param => {
  const { computerId } = param
  const url = `computer/deleteComputer?computerId=${computerId}`
  return service.post(url)
}

