import { createReducer, createAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  isAuthorized: false,
};

export const signInAction = createAction("auth/SIGN_IN");
console.log(signInAction.type);

export default createReducer(initialState, {
  [signInAction]: (state) => {
    console.log(state);
    state.isAuthorized = true;
  },
});

const authSelector = (state) => state.auth;

export const authIsAuthorizedSelector = createSelector(
  authSelector,
  (auth) => auth.isAuthorized
);
