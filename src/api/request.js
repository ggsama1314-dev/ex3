import axios from 'axios'
import { API_BASE_URL } from '../store/types'

const request = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000
})

request.interceptors.request.use(config => {
  // TODO: Add token
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  return response.data
}, error => {
  // TODO: Error Toast trigger
  return Promise.reject(error)
})

export default request
