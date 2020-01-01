import { takeLatest, call, put, all } from 'redux-saga/effects'
import { Alert } from 'react-native'
import { parseISO, formatRelative } from 'date-fns'
import pt from 'date-fns/locale/pt'

import api from '~/services/api'

import {
  listSuccess,
  listFailure,
  updateSuccess,
  updateFailure,
} from './actions'

export function* list() {
  try {
    const response = yield call(api.get, 'help-orders')

    const questions = response.data.map(question => ({
      ...question,
      created_at_formated: formatRelative(
        parseISO(question.created_at),
        new Date(),
        {
          locale: pt,
          addSuffix: true,
        }
      ),
    }))

    yield put(listSuccess(questions))
  } catch (err) {
    Alert.alert('Erro', 'Falha ao listar perguntas, tente novamente mais tarde')
    yield put(listFailure())
  }
}

export function* update({ payload }) {
  try {
    const { id } = payload

    const response = yield call(api.put, `help-orders/${id}/answer`, payload)

    Alert.alert('Sucesso!', 'Pergunta respondida com sucesso!')
    yield put(updateSuccess(response.data))
    // history.push('/questions')
  } catch (err) {
    Alert.alert('Erro', 'Falha ao responder pergunta')
    yield put(updateFailure())
  }
}

export default all([
  takeLatest('@questions/LIST_REQUEST', list),
  takeLatest('@questions/UPDATE_REQUEST', update),
])
