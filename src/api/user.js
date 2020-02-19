import { service } from '../utils/http'

export const apiGetUser = param => {
  const url = `user/findAllUser`
  return service.get(url)
}
