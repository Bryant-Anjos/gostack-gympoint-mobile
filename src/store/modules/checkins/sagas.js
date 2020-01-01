import { takeLatest, call, put, all } from 'redux-saga/effects'
import { Alert } from 'react-native'
import { parseISO, formatRelative } from 'date-fns'
import pt from 'date-fns/locale/pt'

import api from '~/services/api'

import {
  listSuccess,
  listFailure,
  createSuccess,
  createFailure,
} from './actions'

export function* list({ payload }) {
  try {
    const { page = 1 } = payload

    const response = yield call([api, 'get'], 'checkins', { params: { page } })

    const checkins = response.data.map(checkin => ({
      id: checkin.id.toString(),
      title: `Check-in #${checkin.counter}`,
      time: formatRelative(parseISO(checkin.created_at), new Date(), {
        locale: pt,
      }),
    }))

    yield put(listSuccess(checkins))
  } catch (err) {
    Alert.alert('Erro', 'Erro ao listar check-ins, tente novamente mais tarde')
    yield put(listFailure())
  }
}

export function* create() {
  try {
    const response = yield call(api.post, 'checkins')

    const checkin = {
      id: response.data.id.toString(),
      title: `Check-in #${response.data.counter}`,
      time: formatRelative(parseISO(response.data.createdAt), new Date(), {
        locale: pt,
      }),
    }

    yield put(createSuccess(checkin))
    Alert.alert('Sucesso!', 'Check-in realizado com sucesso')
  } catch (err) {
    Alert.alert(
      'Não foi possível realizar check-in',
      'Número máximo de check-ins permitidos para a data alcançados'
    )
    yield put(createFailure())
  }
}

export default all([
  takeLatest('@checkins/LIST_REQUEST', list),
  takeLatest('@checkins/CREATE_REQUEST', create),
])
