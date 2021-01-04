import { call, put, takeEvery } from "redux-saga/effects";

import { signInFailtureAction, signInSuccessAction } from "./authReducer";
import { loginUser } from "../firebase";

function* signIn(action) {
  const { email, password } = action.payload;

  try {
    const { user } = yield call(loginUser, email, password);
    console.log(user);
    yield put(signInSuccessAction(user.uid));
  } catch (err) {
    console.log(err);
    yield put(signInFailtureAction());
  }
}

function* mySaga() {
  yield takeEvery("auth/SIGN_IN", signIn);
}

export default mySaga;
