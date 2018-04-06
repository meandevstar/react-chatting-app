import { createTypes } from 'reduxsauce'

export default createTypes(
  `
  SET_TOKEN
  SET_USER

  API_ATTEMPT
  API_SUCCESS
  API_FAILED
  
  REGISTER_USER_ATTEMPT
  LOGIN_USER_ATTEMPT

  LOG_OUT
  `
)

