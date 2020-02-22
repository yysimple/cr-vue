import { service } from '../utils/http'

// 获取订单列表
export const apiGetOrders = () => {
  const url = `order/findAllOrder`
  return service.get(url)
}

// 添加订单
export const apiAddOrder = param => {
  const url = `order/addOrder`
  return service.post(url, param)
}

// 编辑订单状态
export const apiEditOrderStatus = param => {
  const { status } = param
  const url = `order/changeStatus?status=${status}`
  return service.post(url)
}

// 编辑订单
export const apiEditOrder = param => {
  const url = `order/updateOrder`
  return service.post(url)
}

// 删除订单
export const apiDeleteOrder = param => {
  const { orderId } = param
  const url = `order/deleteOrderById?orderId=${orderId}`
  return service.post(url)
}

