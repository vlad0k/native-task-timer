import { call, put, takeEvery } from "redux-saga/effects";

import {
  logoutAction,
  signInAction,
  signInFailtureAction,
  signInSuccessAction,
  logoutSuccessAction,
  logoutFailtureAction,
} from "./authReducer";
import { getTasksAction, getTasksSuccessAction } from "./tasksReducer";

import { loginUser, logout as firebaseLogout } from "../firebase";

function* signIn(action) {
  const { email, password } = action.payload;

  try {
    const { user } = yield call(loginUser, email, password);
    yield put(signInSuccessAction(user.uid));
  } catch (err) {
    yield put(signInFailtureAction());
  }
}

function* logout() {
  try {
    yield call(firebaseLogout);
    console.log("+");
    yield put(logoutSuccessAction());
  } catch (err) {
    yield put(logoutFailtureAction());
  }
}

function* mySaga() {
  yield takeEvery(signInAction.type, signIn);
  yield takeEvery(logoutAction.type, logout);
}

export default mySaga;
