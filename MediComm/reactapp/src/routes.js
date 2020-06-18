import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import { NoLayout } from "./layouts"

// Route Views
import Dashboard from "./content/Dashboard";
import Login from "./content/Login";
import Me from "./content/Me";
import Chat from "./content/Chat";
import Docreg from "./content/Docreg";
import Patreg from "./content/Patreg";
import Search from "./content/Search";

export default [
    {
        path: "/pat-reg",
        layout: NoLayout,
        component: Patreg
    },
    {
        path: "/doc-reg",
        layout: NoLayout,
        component: Docreg
    },
    {
    path: "/login",
    layout: NoLayout,
    component: Login
    },
    {
        path: "/doc-reg",
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
  {
    path: "/chat",
    layout: DefaultLayout,
    component: Chat
  },
  {
    path: "/search",
    layout: DefaultLayout,
    component: Search
  },
  
  
];
