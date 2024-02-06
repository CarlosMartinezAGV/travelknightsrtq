import { createSlice } from "@reduxjs/toolkit";
import { TState } from "./types";

export type CurrentState = Omit<TState, "user_id"> & { memoryCount: number };

const initialState: CurrentState = {
  id: "",
  abbreviation: "",
  name: "",
  memoryCount: 0,
};

const stateSlice = createSlice({
  name: "currentState",
  initialState,
  reducers: {
    setCurrentState: (state, action) => {
      const { id, abbreviation, name } = action.payload;
      Object.assign(state, { id, abbreviation, name });
    },
    setCurrentStateWithId: (state, action) => {
      state.id = action.payload.id;
    },
    setMemoryCount: (state, action) => {
      state.memoryCount = action.payload.memoryCount;
    },
    setResetCount: (state) => {
      state.memoryCount = 0;
    },
  },
  // extraReducers: for addState setCurrentStateWithId
});

export const {
  setCurrentState,
  setCurrentStateWithId,
  setMemoryCount,
  setResetCount,
} = stateSlice.actions;
export const stateReducer = stateSlice.reducer;
