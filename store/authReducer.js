import { createReducer, createAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  isAuthorized: false,
  user: null,
  isFetching: false,
};

export const signInAction = createAction("auth/SIGN_IN");
export const signInSuccessAction = createAction("auth/AUTHORIZE_SUCCEEDED");
export const signInFailtureAction = createAction("auth/AUTHORIZE_FAILED");

export const logoutAction = createAction("auth/LOGOUT");
export const logoutSuccessAction = createAction("auth/LOGOUT_SUCCEEDED");
export const logoutFailtureAction = createAction("auth/LOGOUT_FAILED");

export default createReducer(initialState, {
  [signInAction]: (state) => {
    state.isFetching = true;
  },
  [signInSuccessAction]: (state, action) => {
    state.isFetching = false;
    state.isAuthorized = true;
    state.user = action.payload;
  },
  [logoutSuccessAction]: (state) => {
    state.isFetching = false;
    state.isAuthorized = false;
    state.user = null;
  },
  [logoutAction]: (state) => {
    state.isFetching = true;
  },
  [logoutSuccessAction]: (state) => {
    state.isAuthorized = false;
    state.user = null;
  },
});

const authSelector = (state) => state.auth;

export const authIsAuthorizedSelector = createSelector(
  authSelector,
  (auth) => auth.isAuthorized
);

export const authIsLoadingSelector = createSelector(
  authSelector,
  (auth) => auth.isFetching
);
