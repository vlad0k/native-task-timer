import React from "react";

import { useSelector } from "react-redux";

import AuthNavigation from "./navigation/AuthNavigation";
import BottomTabNavigation from "./navigation/BottomTabNavigation";

import { authIsAuthorizedSelector } from "./store/authReducer";

export default function Root() {
  const isAuthorized = useSelector(authIsAuthorizedSelector);
  return <>{isAuthorized ? <BottomTabNavigation /> : <AuthNavigation />}</>;
}
