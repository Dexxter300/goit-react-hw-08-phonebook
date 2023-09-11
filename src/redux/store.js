import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';
// import { contactsReducer } from './contactsSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import { contactsApi } from './contacts/slice';
import storage from 'redux-persist/lib/storage';
import { contactsReducer } from './contacts/slice';
import { authReducer } from './auth/slice';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['token'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const persistedFilterReducer = persistReducer(persistConfig, filterReducer);
// const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

export const store = configureStore({
  reducer: {
    filter: persistedFilterReducer,
    auth: persistReducer(authPersistConfig, authReducer),
    // contacts: persistedContactsReducer,
    // [contactsApi.reducerPath]: contactsApi.reducer,
    contacts: contactsReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    // return getDefaultMiddleware().concat(contactsApi.middleware);
  },
});

export const persistor = persistStore(store);
