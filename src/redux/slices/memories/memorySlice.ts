import { createSlice } from "@reduxjs/toolkit";
import { TMemory } from "./types";

const initialState: TMemory = {
  id: "",
  title: "",
  city: "",
  description: "",
  start_date: "",
  end_date: "",
  state_id: "",
};

const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {
    setMemoryToEdit: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.city = action.payload.city;
      state.description = action.payload.description;
      state.start_date = action.payload.startDate;
      state.end_date = action.payload.endDate;
      state.state_id = action.payload.stateId;
    },
  },
});

export const { setMemoryToEdit } = memorySlice.actions;
export const memoryReducer = memorySlice.reducer;
