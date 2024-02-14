import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

const UserOrderPage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="mx-auto text-3xl font-bold">My Orders</h1>
        <UserOrders />
      </Navbar>
    </div>
  );
};

export default UserOrderPage;
