export function listRequest(page) {
  return {
    type: '@checkins/LIST_REQUEST',
    payload: { page },
  }
}

export function listSuccess(checkins) {
  return {
    type: '@checkins/LIST_SUCCESS',
    payload: { checkins },
  }
}

export function listFailure() {
  return {
    type: '@checkins/LIST_FAILURE',
  }
}

export function createRequest() {
  return {
    type: '@checkins/CREATE_REQUEST',
  }
}

export function createSuccess(checkin) {
  return {
    type: '@checkins/CREATE_SUCCESS',
    payload: { checkin },
  }
}

export function createFailure() {
  return {
    type: '@checkins/CREATE_FAILURE',
  }
}
