import { createSlice } from '@reduxjs/toolkit'
import { CurrentState } from '../types'

const initialState: CurrentState = {
  id: -1,
  currentStateAbbreviation: '',
  currentStateTitle: '',
  totalStateMemoryCount: -1,
}

const stateSlice = createSlice({
  name: 'currentState',
  initialState,
  reducers: {
    setCurrentState: (state, action) => {
      state.id = action.payload.id || -1
      state.currentStateAbbreviation = action.payload.currentStateAbbreviation
      state.currentStateTitle = action.payload.currentStateTitle
    },
    setCurrentStateWithId: (state, action) => {
      state.id = action.payload.id
    },
    setTotalStateMemoryCount: (state, action) => {
      state.totalStateMemoryCount = action.payload.totalStateMemoryCount
    },
  },
})

export const {
  setCurrentState,
  setCurrentStateWithId,
  setTotalStateMemoryCount,
} = stateSlice.actions
export const stateReducer = stateSlice.reducer
