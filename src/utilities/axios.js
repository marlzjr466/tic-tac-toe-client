import axios from 'axios'
import _ from 'lodash'

const baseApi = (() => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {}
  })

  const successResponse = response => {
    const status = _.get(response, 'status')
    const customMessage = `${_.toUpper(response.config.method)} ${response.config.url}`

    if (![200, 201].includes(status)) {
      throw new Error(`Client responded with a status: "${status}" on ${customMessage}`)
    }

    return response
  }

  const errorResponse = err => {
    throw new Error(err.response.data)
  }

  instance.interceptors.response.use(
    successResponse,
    errorResponse
  )

  return instance
})()

export {
  baseApi
}