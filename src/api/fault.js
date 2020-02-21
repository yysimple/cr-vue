import { service } from '../utils/http'

// 获取故障列表
export const apiGetTroubles = () => {
  const url = `trouble/findAllTrouble`
  return service.get(url)
}

// 添加故障
export const apiAddTrouble = param => {
  const url = `trouble/addTroubleInfo`
  return service.post(url, param)
}

// 编辑故障状态
export const apiEditTroubleStatus = param => {
  const { status } = param
  const url = `trouble/changeStatus?status=${status}`
  return service.post(url)
}

// 删除故障
export const apiDeleteTrouble = param => {
  const { troubleId } = param
  const url = `trouble/deleteTroubleById?troubleId=${troubleId}`
  return service.post(url)
}

