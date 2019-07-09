import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, BlankLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import Login from "./views/Login";
import ForgotPassword from "./views/ForgotPassword";
import Register from "./views/Register";
import Barber from "./views/barber/Index";
import AddBarber from "./views/barber/Add";
import Coupon from "./views/coupon/Index";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/dashboard" />
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/login",
    layout: BlankLayout,
    component: Login
  },
  {
    path: "/forgot-password",
    layout: BlankLayout,
    component: ForgotPassword
  },
  {
    path: "/register",
    layout: BlankLayout,
    component: Register
  },
  {
    path: "/barber",
    layout: DefaultLayout,
    component: Barber,
    exact: true
  },
  {
    path: "/barber/create",
    layout: DefaultLayout,
    component: AddBarber
  },
  {
    path: "/coupon",
    layout: DefaultLayout,
    component: Coupon,
    exact: true
  },
];
