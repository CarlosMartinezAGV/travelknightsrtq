import { configureStore } from "@reduxjs/toolkit"
import { statesApi } from "./api/statesApi"
import { memoriesApi } from "./api/memoriesApi"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import {
  stateReducer,
  setCurrentState,
  setCurrentStateWithId,
  setTotalStateMemoryCount,
} from "./slices/stateSlice"
import { memoryReducer, setMemoryToEdit } from "./slices/memorySlice"

const store = configureStore({
  reducer: {
    [statesApi.reducerPath]: statesApi.reducer,
    [memoriesApi.reducerPath]: memoriesApi.reducer,
    currentState: stateReducer,
    currentMemory: memoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(statesApi.middleware)
      .concat(memoriesApi.middleware),
})

// Connect API to store
// one time setup per application load
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export {
  store,
  setCurrentState,
  setCurrentStateWithId,
  setTotalStateMemoryCount,
  setMemoryToEdit,
}
export {
  useAddStateMutation,
  useFetchStatesQuery,
  useRemoveStateMutation,
} from "./api/statesApi"
export {
  useAddMemoryMutation,
  useFetchMemoriesQuery,
  useUpdateMemoryMutation,
  useRemoveMemoryMutation,
} from "./api/memoriesApi"

export const selectCurrentState = (state: RootState) => state.currentState
export const selectCurrentMemory = (state: RootState) => state.currentMemory
