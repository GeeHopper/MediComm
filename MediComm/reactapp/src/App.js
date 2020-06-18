
import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import Login from './content/Login';
import Patreg from './content/Patreg';
import Profileedit from './content/Profileedit';
import Me from './content/Me';
import Dsgvo from './content/DSGVO';
import Profile from './content/Profile';
import Search from './content/Search';
import Docreg from'./content/Docreg';
import {Route, Link, Switch} from 'react-router-dom';
import MyDocsOverview from './content/OverviewMyDocs';
import MyPatsOverview from './content/OverviewMyPats';
import SearchMyDocs from './content/SearchMyDocs';
import SearchMyPats from './content/SearchMyPats';
import FileUpload from './content/FileUploadPat';
import ViewFile from './content/ViewFile';
import FileUploadDoc from './content/FileUploadDoc';
import OverviewMyFiles from './content/OverviewMyFiles';
import Picture from './content/Picture';
import Chat from './content/Chat';
import Dashboard from './content/Dashboard';
import Voice from './content/Voice';
import routes from './routes'

import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

// Layout Types
import { DefaultLayout } from "./layouts";


function App() {


  return (
    
    
          <div className="MediComm">
              <Switch basename={process.env.REACT_APP_BASENAME || ""}>
                {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={withTracker(props => {
                      return (
                        <route.layout {...props}>
                          <route.component {...props} />
                        </route.layout>
                      );
                    })}
                  />
                );
              })}
              </Switch>
          
          </div>
     
  );
}

export default App;
