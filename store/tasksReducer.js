import { createReducer, createAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  tasks: [],
};

export const setTasksAction = createAction("tasks/setTasksAction");

export default createReducer(initialState, {
  [setTasksAction]: (state, { payload }) => {
    state.tasks = payload;
  },
});

const tasksSelector = (state) => state.tasks;

export const tasksTasksSelector = createSelector(
  tasksSelector,
  (auth) => auth.tasks
);
