
import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import Header from './content/Header';
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
import FileUpload from './content/FileUpload';
import ViewFile from './content/ViewFile';
import FileUploadDoc from './content/FileUploadDoc';
import OverviewMyFiles from './content/OverviewMyFiles';
import Picture from './content/Picture';
import Chat from './content/Chat';
import Dashboard from './content/Dashboard';

function App() {


  return (
    
    
          <div className="MediComm">
              <Switch>
                <Route path ="/header" component = {Header}/>
                <Route path = "/dashboard" component = {Dashboard}/>
                <Route path = "/login" component = {Login}/>
                <Route path = "/pat-reg" component = {Patreg}/>
                <Route path = "/doc-reg" component = {Docreg}/>
                <Route path = "/profileedit" component = {Profileedit}/>
                <Route path = "/me" component = {Me}/>
                <Route path = "/dsgvo" component = {Dsgvo}/>
                <Route path = "/profile/:userid" component = {Profile}/>
                <Route path = "/search/:query" component = {Search}/>
                <Route path = "/OverviewMyDocs" component = {MyDocsOverview}/>
                <Route path = "/Picture" component = {Picture}/>
                <Route path = "/Chat" component = {Chat}/>
                <Route path = "/OverviewMyPats" component = {MyPatsOverview}/>
                <Route path = "/OverviewMyFiles" component = {OverviewMyFiles}/>
                <Route path = "/SearchMyDocs/:query" component = {SearchMyDocs}/>
                <Route path = "/SearchMyPats/:query" component = {SearchMyPats}/>
                <Route path = "/fileUpload" component = {FileUpload}/>
                <Route path = "/fileUploadDoc" component = {FileUploadDoc} />
                <Route path = "/viewFile/:query" component = {ViewFile}/>
                <Route path="/inline" render={() => (
                  <div class="test">inline test</div>
                )}/>
                {/* keep '/' route at the bottom to avoid bugs */}
                <Route render={() =>(
                  <div>404: Site doesn't exist</div>
                )}/>
              </Switch>
          
          </div>
     
  );
}

export default App;
