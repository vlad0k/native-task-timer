import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

import authReducer from "./authReducer";
import tasksReducer from "./tasksReducer";
import mySaga from "./sagas";

import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});

const persistConfig = {
  key: "auth",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [sagaMiddleware],
});

persistStore(store);

sagaMiddleware.run(mySaga);

export default store;
