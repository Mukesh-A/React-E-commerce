import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../features/navbar/Navbar";
import { UserProfile } from "../features/user/components/UserProfile";
import { checkAuthAsync } from "../features/auth/authSlice";


const UserProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);
  return (
    <div>
      <Navbar>
        <h1 className="mx-auto text-3xl font-bold">My Profile</h1>
        <UserProfile />
      </Navbar>
    </div>
  );
};

export default UserProfilePage;
