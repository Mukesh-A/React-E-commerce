import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {selectCount } from "../userSlice";

export function UserProfile() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return <div></div>;
}
