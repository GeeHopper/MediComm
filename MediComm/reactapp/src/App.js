
import React from 'react';
import './App.css';
import {Route, Link, Switch} from 'react-router-dom';
import routes from './routes'

import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";



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
