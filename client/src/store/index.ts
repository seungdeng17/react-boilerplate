import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import commonReducer from './common';
import commonSaga from './common/saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { common: commonReducer },
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
  devTools: process.env.NODE_ENV === 'development',
});

function* rootSaga() {
  yield all([commonSaga()]);
}
sagaMiddleware.run(rootSaga);

export default store;
