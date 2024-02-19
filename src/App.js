import React, { useEffect } from "react";

import "./App.css";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// day1 40.30

//cart full page he did i have in side 45.0

// 2days 1.23

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import UserOrderPage from "./pages/UserOrderPage";

import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetails from "./features/admin/components/AdminProductDetails";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import ProductForm from "./features/admin/components/ProductForm";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailsPage />
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailsPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: "/orders",
    element: <UserOrderPage />,
  },
  {
    path: "/profile",
    element: <UserProfilePage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  // const cartItems = useSelector();

  // to fetch the cart items
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
      console.log("app", user.id);
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
