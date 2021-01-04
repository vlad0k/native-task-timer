import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import mySaga from "./sagas";

import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(mySaga);

export default store;
