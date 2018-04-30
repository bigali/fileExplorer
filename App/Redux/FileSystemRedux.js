import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fileSystemRequest: ['node'],
  fileSystemSuccess: ['payload'],
  fileSystemFailure: null
})

export const FileSystemTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: [],
  error: null
})

/* ------------- Selectors ------------- */

export const FileSystemSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { node }) =>
  state.merge({ fetching: true, node, payload: [] })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FILE_SYSTEM_REQUEST]: request,
  [Types.FILE_SYSTEM_SUCCESS]: success,
  [Types.FILE_SYSTEM_FAILURE]: failure
})
