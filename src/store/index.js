import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { pagination, entities } from '../api/reducers';
import { authReducer } from '../modules/auth';

export const rootReducer = combineReducers({
  auth: authReducer,
  pagination,
  entities,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
