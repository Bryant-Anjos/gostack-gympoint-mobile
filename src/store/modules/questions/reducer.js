import produce from 'immer'
import { parseISO, formatRelative } from 'date-fns'
import pt from 'date-fns/locale/pt'

const INITIAL_STATE = {
  loading: false,
  page: 1,
  index: [],
}

export default function questions(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@questions/LIST_REQUEST': {
        draft.loading = true
        break
      }
      case '@questions/LIST_SUCCESS': {
        if (action.payload.questions.length > 0) {
          draft.index = [...draft.index, ...action.payload.questions]
          draft.page += 1
        }

        draft.loading = false
        break
      }
      case '@questions/LIST_FAILURE': {
        draft.loading = false
        break
      }
      case '@questions/REFRESH_REQUEST': {
        draft.loading = true
        break
      }
      case '@questions/REFRESH_SUCCESS': {
        draft.index = action.payload.questions
        draft.loading = false
        draft.page = 2
        break
      }
      case '@questions/CREATE_SUCCESS': {
        draft.index.unshift(action.payload.question)
        break
      }
      case '@questions/UPDATE_QUESTION': {
        const { question } = action.payload

        const index = state.index.findIndex(
          item => Number(item.id) === Number(question.id)
        )

        draft.index[index] = {
          id: question.id.toString(),
          question: question.question,
          answer: question.answer,
          answered: !!question.answer_at,
          time: formatRelative(parseISO(question.created_at), new Date(), {
            locale: pt,
          }),
        }
        break
      }
      default:
    }
  })
}
