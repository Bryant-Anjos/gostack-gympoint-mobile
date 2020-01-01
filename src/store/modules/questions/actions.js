export function listRequest() {
  return {
    type: '@questions/LIST_REQUEST',
  }
}

export function listSuccess(questions) {
  return {
    type: '@questions/LIST_SUCCESS',
    payload: { questions },
  }
}

export function listFailure() {
  return {
    type: '@questions/LIST_FAILURE',
  }
}

export function updateRequest(id, answer) {
  return {
    type: '@questions/UPDATE_REQUEST',
    payload: { id, answer },
  }
}

export function updateSuccess(question) {
  return {
    type: '@questions/UPDATE_SUCCESS',
    payload: { question },
  }
}

export function updateFailure() {
  return {
    type: '@questions/UPDATE_FAILURE',
  }
}
