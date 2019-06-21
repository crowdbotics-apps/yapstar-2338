import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native'

storeAuthInfo = async (email, password, token) => {
  try {
    await AsyncStorage.setItem('Auth', JSON.stringify({email: email, password: password, token: token}));
  } catch (error) {
    console.warn(error)
  }
};

function* signup(action) {
  try {
    let {data} = yield call(Api.POST, 'registration/', action.payload) 
    if (data.detail) {
      yield put({type:'RES_SIGNUP', payload:{...data}})
    } else {
      yield put({type:'RES_FAIL', payload:'Error Occurs. Please try again later.'})
    }
  } catch (err) {
    try {
      errors = JSON.parse(err.request._response)
      if (errors.email) {
        yield put({type:'RES_FAIL', payload:errors.email[0]})
      } 
      else if (errors.detail) {
        yield put({type:'RES_FAIL', payload:errors.detail})
      } 
      else {
        yield put({type:'RES_FAIL', payload:'Error Occours. Please try again later.'})
      }
    } catch (errs) {
      yield put({type:'RES_FAIL', payload:'Network Error. Please check network connection.'})
    }    
  }
}

function* signin(action) {
  try {
    let {data} = yield call(Api.POST, 'accounts/login/', action.payload)
    if (data.key) {
      storeAuthInfo(action.payload.email, action.payload.password, data.key)
      yield put({type:'RES_SIGNIN', payload:{...data}})
    } else {
      yield put({type:'RES_FAIL', payload:'Email or password is verified'})
    }
  } catch (err) {
    try { 
      console.warn(err.request)
      errors = JSON.parse(err.request._response)
      if (errors.non_field_errors) {
        yield put({type:'RES_FAIL', payload:errors.non_field_errors[0]})
      } 
      else if (errors.detail) {
        yield put({type:'RES_FAIL', payload:errors.detail})
      } 
      else {
        yield put({type:'RES_FAIL', payload:'Error Occours. Please try again later.'})
      }
    } catch (errs) {
      yield put({type:'RES_FAIL', payload:'Network Error. Please check network connection.'})
    }
    
  }
}

function* resetpw(action) {
  try {
    let {data} = yield call(Api.POST, 'accounts/password/reset/', action.payload)       
    if (data.detail) {
      yield put({type:'RES_RESETPW', payload:{...data}})
    } else {
      yield put({type:'RES_FAIL', payload:'Error Occurs. Please try again later.'})
    }  
  } catch (err) {
    try {
      errors = JSON.parse(err.request._response)
      if (errors.detail) {
        yield put({type:'RES_FAIL', payload:errors.detail})
      } else {
        yield put({type:'RES_FAIL', payload:'Error Occurs. Please try again later.'})
      }
    } catch (errs) {
      yield put({type:'RES_FAIL', payload:'Network Error. Please check network connection.'})
    }
  }
}

function* add_event(action) {
  try {
    let {data} = yield call(Api.POST, 'add_event/', action.payload)
    if (data.success) {
      yield put({type:'RES_ADD_EVENT', payload:{...data}})
    } else {
      yield put({type:'RES_FAIL', payload:'Error occurs, Please try again later.'})
    }
  } catch (err) {
    console.warn(err)
    yield put({type:'RES_FAIL', payload:'Network Error. Please check network connection.'})
  }
}

export default function * rootSaga() {
  yield takeLatest('REQ_SIGNUP', signup)
  yield takeLatest('REQ_SIGNIN', signin)
  yield takeLatest('REQ_RESETPW', resetpw)
  yield takeLatest('REQ_ADD_EVENT', add_event)
}