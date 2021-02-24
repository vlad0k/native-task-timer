import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import AuthNavigation from "./navigation/AuthNavigation";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import { authUserSelector } from "./store/authReducer";
import { setTasksAction } from "./store/tasksReducer";
import { dbRefTasks } from "./firebase";

import { authIsAuthorizedSelector } from "./store/authReducer";

export default function Root() {
  const user = useSelector(authUserSelector);
  const isAuthorized = useSelector(authIsAuthorizedSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthorized) {
      dbRefTasks.child(user).on("value", (snap) => {
        dispatch(setTasksAction(snap.val()));
      });
    }
  }, [isAuthorized, user]);

  return <>{isAuthorized ? <BottomTabNavigation /> : <AuthNavigation />}</>;
}
