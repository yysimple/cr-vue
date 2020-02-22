import { service } from '../utils/http'

// 获取意见回馈
export const apiAllFeedback = () => {
  const url = `feedback/findAllFeedback`
  return service.get(url)
}

// 添加问题
export const apiAddQuestion = param => {
  const url = `feedback/addQuestion`
  return service.post(url, param)
}

// 添加答案
export const apiAddAnswer = param => {
  const { answer , id } = param
  const url = `feedback/addAnswer?answer=${answer}&questionId=${id}`
  return service.post(url)
}

// 删除意见反馈
export const apiDeleteFeedback = param => {
  const { id } = param
  const url = `feedback/deleteFeedbackById?feedbackId=${id}`
  return service.post(url)
}

