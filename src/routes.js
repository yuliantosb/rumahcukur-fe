import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, BlankLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import Login from "./views/Login";
import ForgotPassword from "./views/ForgotPassword";
import Register from "./views/Register";
import Barber from "./views/barber/Barber";
import AddBarber from "./views/barber/AddBarber";
import EditBarber from "./views/barber/EditBarber";
import ViewBarber from "./views/barber/ViewBarber";
import Coupon from "./views/coupon/Coupon";
import AddCoupon from "./views/coupon/AddCoupon";
import EditCoupon from "./views/coupon/EditCoupon";
import User from "./views/user/User";
import AddUser from "./views/user/AddUser";
import EditUser from "./views/user/EditUser";
import ViewUser from "./views/user/ViewUser";
import Price from "./views/price/Price";
import Role from "./views/role/Role";
import AddRole from "./views/role/AddRole";
import EditRole from "./views/role/EditRole";
import Permission from "./views/permission/Permission";
import AddPermission from "./views/permission/AddPermission";
import EditPermission from "./views/permission/EditPermission";
import Order from "./views/order/Order";

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
    path: "/barber/edit/:id",
    layout: DefaultLayout,
    component: EditBarber
  },
  {
    path: "/barber/view/:id",
    layout: DefaultLayout,
    component: ViewBarber
  },
  {
    path: "/coupon",
    layout: DefaultLayout,
    component: Coupon,
    exact: true
  },
  {
    path: "/coupon/create",
    layout: DefaultLayout,
    component: AddCoupon
  },
  {
    path: "/coupon/edit/:id",
    layout: DefaultLayout,
    component: EditCoupon
  },
  {
    path: "/user",
    layout: DefaultLayout,
    component: User,
    exact: true
  },
  {
    path: "/user/create",
    layout: DefaultLayout,
    component: AddUser,
  },
  {
    path: "/user/edit/:id",
    layout: DefaultLayout,
    component: EditUser,
  },
  {
    path: "/user/view/:id",
    layout: DefaultLayout,
    component: ViewUser,
  },
  {
    path: "/price",
    layout: DefaultLayout,
    component: Price,
  },
  {
    path: "/role",
    layout: DefaultLayout,
    component: Role,
    exact: true
  },
  {
    path: "/role/create",
    layout: DefaultLayout,
    component: AddRole,
    exact: true
  },
  {
    path: "/role/edit/:id",
    layout: DefaultLayout,
    component: EditRole,
    exact: true
  },
  {
    path: "/permission",
    layout: DefaultLayout,
    component: Permission,
    exact: true
  },
  {
    path: "/permission/create",
    layout: DefaultLayout,
    component: AddPermission,
    exact: true
  },
  {
    path: "/permission/edit/:id",
    layout: DefaultLayout,
    component: EditPermission,
    exact: true
  },
  {
    path: "/statement",
    layout: DefaultLayout,
    component: Order,
    exact: true
  },
];
