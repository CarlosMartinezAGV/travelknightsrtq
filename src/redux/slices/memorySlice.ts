import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: -1,
  title: "",
  city: "",
  description: "",
  startDate: "",
  endDate: "",
  userId: -1,
  stateId: -1,
}

const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {
    setMemoryToEdit: (state, action) => {
      state.id = action.payload.id
      state.title = action.payload.title
      state.city = action.payload.city
      state.description = action.payload.description
      state.startDate = action.payload.startDate
      state.endDate = action.payload.endDate
      state.userId = action.payload.userId
      state.stateId = action.payload.stateId
    },
  },
})

export const { setMemoryToEdit } = memorySlice.actions
export const memoryReducer = memorySlice.reducer
