import { takeLatest, call, put, all } from 'redux-saga/effects'
import { Alert } from 'react-native'
import { parseISO, formatRelative } from 'date-fns'
import pt from 'date-fns/locale/pt'

import api from '~/services/api'

import {
  listSuccess,
  listFailure,
  refreshSuccess,
  createSuccess,
  createFailure,
} from './actions'

export function* list({ payload }) {
  try {
    const { page = 1 } = payload

    const response = yield call([api, 'get'], 'questions', { params: { page } })

    const questions = response.data.map(question => ({
      id: question.id.toString(),
      question: question.question,
      answer: question.answer,
      answered: !!question.answer_at,
      time: formatRelative(parseISO(question.createdAt), new Date(), {
        locale: pt,
      }),
    }))

    yield put(listSuccess(questions))
  } catch (err) {
    Alert.alert(
      'Erro',
      'Erro ao listar as perguntas, tente novamente mais tarde'
    )
    yield put(listFailure())
  }
}

export function* refresh() {
  try {
    const response = yield call([api, 'get'], 'questions')

    const questions = response.data.map(question => ({
      id: question.id.toString(),
      question: question.question,
      answer: question.answer,
      answered: !!question.answer_at,
      time: formatRelative(parseISO(question.createdAt), new Date(), {
        locale: pt,
      }),
    }))

    yield put(refreshSuccess(questions))
  } catch (err) {
    Alert.alert(
      'Erro',
      'Erro ao listar as perguntas, tente novamente mais tarde'
    )
    yield put(listFailure())
  }
}

export function* create({ payload }) {
  try {
    const response = yield call(api.post, 'questions', payload)

    const question = {
      id: response.data.id.toString(),
      question: response.data.question,
      answer: response.data.answer,
      answered: !!response.data.answer_at,
      time: formatRelative(parseISO(response.data.createdAt), new Date(), {
        locale: pt,
      }),
    }

    yield put(createSuccess(question))
    Alert.alert('Sucesso!', 'Sua pergunta foi realizada com sucesso')
  } catch (err) {
    Alert.alert(
      'Erro',
      'Não foi possível enviar a sua pergunta. Tente novamente mais tarde'
    )
    yield put(createFailure())
  }
}

export default all([
  takeLatest('@questions/LIST_REQUEST', list),
  takeLatest('@questions/REFRESH_REQUEST', refresh),
  takeLatest('@questions/CREATE_REQUEST', create),
])
