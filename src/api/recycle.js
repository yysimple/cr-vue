import { service } from '../utils/http'

// 添加回收员
// export const saveReWorker = (param) => {
//   const url = `recycle/save`
//   return service.post(url, param)
// }

// 添加回收公司
export const saveReCompany = (params) => {
  const { username, password, param } = params
  const url = `user/createNewRecycleCompany?username=${username}&password=${password}`
  return service.post(url, param)
}

// 查询所有回收公司
export const findReCompanies = () => {
  const url = `recycle/findAllRecycleCompany`
  return service.get(url)
}

// 查询所有回收公司
export const fndAllByRecycleId = (id) => {
  const url = `recycle/findAllByRecycleId?recycleId=${id}`
  return service.get(url)
}

// 查询网点通过回收公司
export const findNodesByRecycleId = (id) => {
  const url = `recycleNode/findAllNodeByRecycleCompanyId?recycleCompanyId=${id}`
  return service.get(url)
}

// 查询回收员通过网点ID
export const findReWorkersByNodeId = (id) => {
  const url = `recycler/findAllRecyclerByNodeId?recycleNodeId=${id}`
  return service.get(url)
}

// 创建网点
export const saveNewNode = (params) => {
  const { recycleId, param } = params
  const url = `recycle/createNewNode?recycleId=${recycleId}`
  return service.post(url, param)
}

// 创建回收员
export const saveNewReWorker = (params) => {
  const { nodeId, param } = params
  const url = `recycle/createNewRecycler?recycleNodeId=${nodeId}`
  return service.post(url, param)
}

