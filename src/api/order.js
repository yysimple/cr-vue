import { service } from '../utils/http'

// 查询所有订单
// export const apiFindAllOrder = () => {
//   const url = `recycleOrder/findAllOrder`
//   return service.get(url)
// }

// 查询所有订单
// export const fndAllByRecycleId = (id) => {
//   const url = `recycle/findAllByRecycleId?recycleId=${id}`
//   return service.get(url)
// }

// 查询所有的订单以Vo的形式返回
export const apiFindAllOrder = () => {
  const url = `recycleOrder/findAllOrdersVo`
  return service.get(url)
}

// 查询所有的订单以Vo的形式返回
export const fndAllByRecycleId = (id) => {
  const url = `recycleOrder/findOrdersVoToRecycle?recycleCompanyId=${id}`
  return service.get(url)
}

// 通过订单id查询该订单详情
export const findOrderById = (id) => {
  const url = `recycleOrder/findOrderById?orderId=${id}`
  return service.get(url)
}

