import { configureStore } from '@reduxjs/toolkit'
import { statesApi } from './api/statesApi'
import { memoriesApi } from './api/memoriesApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

const store = configureStore({
  reducer: {
    [statesApi.reducerPath]: statesApi.reducer,
    [memoriesApi.reducerPath]: memoriesApi.reducer,
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
export { store }
export {
  useFetchStatesQuery,
  // useAddStateMutation,
  // useRemoveStateMutation,
} from './api/statesApi'
export {
  useFetchMemoriesQuery,
  useAddMemoryMutation,
  useRemoveMemoryMutation,
} from './api/memoriesApi'
