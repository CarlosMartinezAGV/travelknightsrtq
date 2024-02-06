import { createSlice } from "@reduxjs/toolkit";
import { TState } from "./types";

export type CurrentState = TState & { memoryCount: number };

const initialState: CurrentState = {
  id: "",
  abbreviation: "",
  name: "",
  user_id: "",
  memoryCount: 0,
};

const stateSlice = createSlice({
  name: "currentState",
  initialState,
  reducers: {
    setCurrentState: (state, action) => {
      state.id = action.payload.id;
      state.abbreviation = action.payload.abbreviation;
      state.name = action.payload.name;
    },
    setCurrentStateWithId: (state, action) => {
      state.id = action.payload.id;
    },
    setTotalStateMemoryCount: (state, action) => {
      state.memoryCount = action.payload.totalStateMemoryCount;
    },
  },
});

export const {
  setCurrentState,
  setCurrentStateWithId,
  setTotalStateMemoryCount,
} = stateSlice.actions;
export const stateReducer = stateSlice.reducer;
