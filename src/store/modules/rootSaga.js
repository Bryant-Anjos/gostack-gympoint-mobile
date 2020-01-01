import { all } from 'redux-saga/effects'

import auth from './auth/sagas'
import user from './user/sagas'
import questions from './questions/sagas'
import checkins from './checkins/sagas'

export default function* rootSaga() {
  return yield all([auth, user, questions, checkins])
}
