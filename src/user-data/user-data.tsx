import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import { Profile } from "../shared/user/types";
import { selectProfile } from "../shared/user/selectors";
import { useAppDispatch } from "../store/index";
import { getCurrentUser } from "../shared/user/slice";

interface UserDataProps {
  children: (user: Profile) => ReactElement;
}

export const UserData = ({ children }: UserDataProps) => {
  const dispatch = useAppDispatch();

  const userProfile = useSelector(selectProfile);
  const token = localStorage.getItem("token") || "";
  const user = token && (jwt_decode(token) as Profile);

  console.log("user", user);

  useEffect(() => {
    if (user && !userProfile.id) {
      dispatch(getCurrentUser(user.id)).catch(console.error);
    }
  }, [user, userProfile, dispatch]);

  return <>{children(userProfile)}</>;
};
