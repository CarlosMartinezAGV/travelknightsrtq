import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  stateReducer,
  setCurrentState,
  setCurrentStateWithId,
  setTotalStateMemoryCount,
} from "./slices/states/stateSlice";
import { memoryReducer, setMemoryToEdit } from "./slices/memories/memorySlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./slices/auth/authSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  currentState: stateReducer,
  currentMemory: memoryReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

// Export the store and the persistor
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

// Reducers
export {
  setCurrentState,
  setCurrentStateWithId,
  setTotalStateMemoryCount,
  setMemoryToEdit,
};
export {
  useAddStateMutation,
  useFetchStatesQuery,
  useRemoveStateMutation,
} from "./slices/states/statesApi";
export {
  useAddMemoryMutation,
  useFetchMemoriesQuery,
  useUpdateMemoryMutation,
  useRemoveMemoryMutation,
} from "./slices/memories/memoriesApi";

export const selectCurrentState = (state: RootState) => state.currentState;
export const selectCurrentMemory = (state: RootState) => state.currentMemory;
