import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import fetchReducer from '@store/fetch';
import fetchSaga from '@store/fetch/saga';

const rootReducer = combineReducers({ fetch: fetchReducer });
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
  devTools: process.env.NODE_ENV === 'development',
});

function* rootSaga() {
  yield all([fetchSaga()]);
}
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
