
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from'./user/useSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer });

const persistConfig={
    key:'root',
    storage,
    version:1
}

const persistedRegister=persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  reducer: persistedRegister,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor=persistStore(store)
