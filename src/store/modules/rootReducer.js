import { combineReducers } from 'redux'

import auth from './auth/reducer'
import user from './user/reducer'
import questions from './questions/reducer'
import checkins from './checkins/reducer'

export default combineReducers({
  auth,
  user,
  questions,
  checkins,
})
