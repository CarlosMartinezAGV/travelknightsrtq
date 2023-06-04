import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentStateAbbreviation: ' ',
  currentStateTitle: ' ',
}

const stateSlice = createSlice({
  name: 'currentState',
  initialState,
  reducers: {
    setCurrentState: (state, action) => {
      state.currentStateAbbreviation = action.payload.currentStateAbbreviation
      state.currentStateTitle = action.payload.currentStateTitle
    },
  },
})

export const { setCurrentState } = stateSlice.actions
export const stateReducer = stateSlice.reducer
