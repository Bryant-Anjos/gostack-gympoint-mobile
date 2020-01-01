import produce from 'immer'

const INITIAL_STATE = {
  loading: false,
  page: 1,
  index: [],
}

export default function checkins(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@checkins/LIST_REQUEST': {
        draft.loading = true
        break
      }
      case '@checkins/LIST_SUCCESS': {
        draft.index = [...draft.index, ...action.payload.checkins]
        draft.loading = false
        draft.page += 1
        break
      }
      case '@checkins/LIST_FAILURE': {
        draft.loading = false
        break
      }
      case '@checkins/CREATE_SUCCESS': {
        draft.index.unshift(action.payload.checkin)
        break
      }
      default:
    }
  })
}
