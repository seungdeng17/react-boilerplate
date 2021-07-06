import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {},
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV === 'development',
});

function* rootSaga() {
  yield all([]);
}
sagaMiddleware.run(rootSaga);

export default store;
