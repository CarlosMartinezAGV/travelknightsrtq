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
      const { id, title, city, description, start_date, end_date, state_id } =
        action.payload;
      Object.assign(state, {
        id,
        title,
        city,
        description,
        start_date,
        end_date,
        state_id,
      });
    },
  },
});

export const { setMemoryToEdit } = memorySlice.actions;
export const memoryReducer = memorySlice.reducer;
