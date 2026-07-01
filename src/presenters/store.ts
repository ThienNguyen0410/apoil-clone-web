import { configureStore, combineReducers } from '@reduxjs/toolkit';
import customerReducer from './slices/customerSlice';
import authReducer from './slices/authSlice';
import localeReducer from './slices/localeSlice';
import profileReducer from './slices/profileSlice';
import {persistStore, persistReducer} from 'redux-persist'
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'

const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
};

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'locale', 'profile'],
    version: 1,
    migrate: (state: any) => {
        return Promise.resolve(state)
    }
}

const rootReducer = combineReducers({
    customer: customerReducer,
    auth: authReducer,
    locale: localeReducer,
    profile: profileReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH ,REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;