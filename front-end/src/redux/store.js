import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expenseSlice from "./expenseSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',  // ✅ corrected 'ley' → 'key'
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  expense: expenseSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // ✅ renamed variable

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // ✅ fixed typo
      },
    }),
});

export const persistor = persistStore(store); // optional, but needed if using PersistGate
export default store;
