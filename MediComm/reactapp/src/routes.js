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
import SearchOverview from "./content/SearchOverview";
import SearchMyPats from "./content/SearchMyPats";
import SearchMyDocs from "./content/SearchMyDocs";
import Profile from "./content/Profile";
import OverviewTherapies from "./content/OverviewTherapies";
import OverviewMyPats from "./content/OverviewMyPats";
import OverviewMyDocs from "./content/OverviewMyDocs";
import OverviewMyFiles from "./content/OverviewMyFiles";
import FileUpload from "./content/FileUpload";
import FileUploadDoc from "./content/FileUploadDoc";
import FileUploadPat from "./content/FileUploadPat";
import ViewFile from "./content/ViewFile";
import Voice from "./content/Voice";
import Picture from "./content/Picture";
import DSGVO from "./content/DSGVO";

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
    path: "/dashboard",
    layout: DefaultLayout,
    component: Dashboard
  },
  {
    path: "/searchoverview",
    layout: DefaultLayout,
    component: SearchOverview
  },
  {
    path: "/searchmypats",
    layout: DefaultLayout,
    component: SearchMyPats
  },
  {
    path: "/searchmydocs",
    layout: DefaultLayout,
    component: SearchMyDocs
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
  {
    path: "/profile",
    layout: DefaultLayout,
    component: Profile
  },
  {
    path: "/overviewtherapies",
    layout: DefaultLayout,
    component: OverviewTherapies
  },
  {
    path: "/overviewmypats",
    layout: DefaultLayout,
    component: OverviewMyPats
  },
  {
    path: "/overviewmydocs",
    layout: DefaultLayout,
    component: OverviewMyDocs
  },
  {
    path: "/me",
    layout: DefaultLayout,
    component: Me
  },
  {
    path: "/overviewmyfiles",
    layout: DefaultLayout,
    component: OverviewMyFiles
  },
  {
    path: "/fileupload",
    layout: DefaultLayout,
    component: FileUpload
  },
  {
    path: "/fileuploadpat",
    layout: DefaultLayout,
    component: FileUploadPat
  },
  {
    path: "/fileuploaddoc",
    layout: DefaultLayout,
    component: FileUploadDoc
  },
  {
    path: "/viewfile",
    layout: DefaultLayout,
    component: ViewFile
  },
  {
    path: "/voice",
    layout: DefaultLayout,
    component: Voice
  },
  {
    path: "/picture",
    layout: DefaultLayout,
    component: Picture
  },
  {
    path: "/dsgvo",
    layout: NoLayout,
    component: DSGVO
  },
  
  
];
