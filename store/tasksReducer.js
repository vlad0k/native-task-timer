import { createReducer, createAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  tasks: [],
  isFetching: false,
  isLoaded: false,
};

export const addTaskAction = createAction("tasks/ADD_TASK");
export const deleteTaskAction = createAction("tasks/DELETE_TASK");

export default createReducer(initialState, {
  [addTaskAction]: (state, action) => {
    state.tasks = [...state.tasks, action.payload.newTask];
  },
  [deleteTaskAction]: (state, action) => {
    state.tasks.splice(action.payload, 1);
  },
});

const tasksSelector = (state) => state.tasks;

export const tasksListSelector = createSelector(
  tasksSelector,
  (tasks) => tasks.tasks
);
