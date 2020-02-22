import { service } from '../utils/http'

// 获取零件列表
export const apiGetParts = () => {
  const url = `part/findAllPart`
  return service.get(url)
}

// 添加零件
export const apiAddPart = param => {
  const url = `part/addParts`
  return service.post(url, param)
}

// 使用零件
export const apiUsePart = param => {
  const { id } = param
  const url = `part/usePart?partId=${id}`
  return service.post(url)
}

