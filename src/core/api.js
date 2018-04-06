import { create } from 'apisauce';
import { prop, contains } from 'ramda'
import config from './config'


const api = create({
  baseURL: config.apiUrl,
  headers: {'Accept': 'application/vnd.github.v3+json'}
})

api.addResponseTransform(response => {
  const ok = prop('ok', response)
  const data = prop('data', response)
  const problem = prop('problem', response)

  if (!ok) {
    switch (problem) {
      case 'CLIENT_ERROR':
        response.data = {
            status: 'error',
            ...data,
        }
        break
      case 'TIMEOUT_ERROR':
        response.status = 408
        response.data = {
          status: 'error',
          message: 'Network timeout. Please try again.',
          ...data,
        }
        break
      case 'CONNECTION_ERROR':
        response.status = 503
        response.data = {
          status: 'error',
          message: 'Server not available.',
          ...data,
        }
        break
      case 'NETWORK_ERROR':
        response.status = 511
        response.data = {
          status: 'error',
          message: 'Network unavailable.',
          ...data,
        }
        break
      case 'CANCEL_ERROR':
        response.status = 500
        response.data = {
          status: 'error',
          message: 'Request has been cancelled.',
          ...data,
        }
        break
      default:
        response.status = 500
        response.data = {
          status: 'error',
          message: 'System error.',
          ...data,
        }
    }
  }
})


export const registerUser = (data) =>
  api.post(config.apiUrl + '/v1/users', data);

export const loginUser = (data) =>
  api.post(config.apiUrl + '/v1/user/authenticate', data)

export const getMessages = ({ roomId }) =>
  api.get(config.apiUrl + `/v1/room/${roomId}/messages`)

export const getRooms = () =>
  api.get(config.apiUrl + '/v1/rooms')

export const getUsers = () =>
  api.get(config.apiUrl + '/v1/users')

export const createRoom = (data) =>
  api.post(config.apiUrl + '/v1/rooms', data)

export const setTokenHeader = (token) =>
  api.setHeader('accessToken', token)