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
import { contactsApi } from './contactsSlice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedFilterReducer = persistReducer(persistConfig, filterReducer);
// const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

export const store = configureStore({
  reducer: {
    filter: persistedFilterReducer,
    // contacts: persistedContactsReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(contactsApi.middleware);
    // return getDefaultMiddleware().concat(contactsApi.middleware);
  },
});

export const persistor = persistStore(store);
