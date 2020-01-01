import produce from 'immer'

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
        draft.index = action.payload.questions
        draft.loading = false
        break
      }
      case '@questions/LIST_FAILURE': {
        draft.loading = false
        break
      }
      case '@questions/UPDATE_SUCCESS': {
        const listQuestions = state.index.filter(
          question => Number(question.id) !== Number(action.payload.question.id)
        )

        draft.index = listQuestions
        break
      }
      default:
    }
  })
}
