const initialState = {
  isLoading: false,  
  user: null,
  token: null,
  error: null,
  task: '',
  unRead: 0
};

import { Alert } from 'react-native'

export const SagaReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REQ_SIGNIN':
      return {...state, isLoading: true, task: 'signin'}
    case 'REQ_SIGNUP':
      return {...state, isLoading: true, task: 'signup'}    
    case 'REQ_SIGNOUT':
      return {...state, isLoading: false, user: null}
    case 'RES_SIGNIN':
      return {...state, isLoading: false, user: action.payload}
    case 'RES_SIGNUP':
      setTimeout(() => {
        Alert.alert('Create User', 'Verification e-mail sent to your email address. Please confirm your email.')
      }, 200) 
      return {...state, isLoading: false}
    case 'REQ_RESETPW':
      return {...state, isLoading: true, task: 'resetpw'}
    case 'REQ_ADD_EVENT':
      return {...state, isLoading: true, task: 'add_event'}
    case 'RES_ADD_EVENT':
      return {...state, isLoading: false, task: action.payload}
    case 'RES_RESETPW':
      setTimeout(() => {
        Alert.alert('Reset Password', 'Please check your mail for instructions to change password.')
      }, 200)      
      return {...state, isLoading: false}
    case 'RES_FAIL':
      setTimeout(() => {
        Alert.alert('Error', action.payload)
      }, 200)      
      return {...state, isLoading: false}
    default: return state;
  }
}