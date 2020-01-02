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
        draft.index = [...draft.index, ...action.payload.questions]
        draft.loading = false
        draft.page += 1
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
        draft.page += 1
        break
      }
      case '@questions/CREATE_SUCCESS': {
        draft.index.unshift(action.payload.question)
        break
      }
      default:
    }
  })
}
