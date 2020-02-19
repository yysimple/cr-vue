import { service } from '../utils/http'

// 查看所有待审批的维修企业
export const apiFindUnReCompany = () => {
  const url = `repair/findAllPendingRepairCompany`
  return service.get(url)
}

// 查询所有微信换绑记录
export const apiFindAllWxBind = () => {
  const url = `repairWx/findAllWxBind`
  return service.get(url)
}

// 注册审批通过
export const saveRegisterStatus = (param) => {
  const { status, repairId, remark } = param
  const url = `repair/changeStatus?remark=${remark}&repairId=${repairId}&status=${status}`
  return service.post(url)
}
