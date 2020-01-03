export function listRequest(page) {
  return {
    type: '@questions/LIST_REQUEST',
    payload: { page },
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

export function refreshRequest() {
  return {
    type: '@questions/REFRESH_REQUEST',
  }
}

export function refreshSuccess(questions) {
  return {
    type: '@questions/REFRESH_SUCCESS',
    payload: { questions },
  }
}

export function createRequest(question) {
  return {
    type: '@questions/CREATE_REQUEST',
    payload: { question },
  }
}

export function createSuccess(question) {
  return {
    type: '@questions/CREATE_SUCCESS',
    payload: { question },
  }
}

export function createFailure() {
  return {
    type: '@questions/CREATE_FAILURE',
  }
}

export function updateQuestion(question) {
  return {
    type: '@questions/UPDATE_QUESTION',
    payload: { question },
  }
}
