import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import { NoLayout } from "./layouts"

// Route Views
import Dashboard from "./content/Dashboard";
import Login from "./content/Login";
import Me from "./content/Me";

export default [
    {
    path: "/login",
    layout: NoLayout,
    component: Login
    },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: Dashboard
  },
  {
    path: "/me",
    layout: DefaultLayout,
    component: Me
  },
  
  
];
