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

function App() {

var myVar = 2;

function changeColor(selector, color){
  var elem = document.getElementById("test");
  ReactDOM.findDOMNode(elem).style.color = color;
}

  return (
    <div className="MediComm">
        <Switch>
          <Route path ="/header" component = {Header}/>
          <Route path = "/login" component = {Login}/>
          <Route path = "/pat-reg" component = {Patreg}/>
          <Route path = "/doc-reg" component = {Docreg}/>
          <Route path = "/profileedit" component = {Profileedit}/>
          <Route path = "/me" component = {Me}/>
          <Route path = "/dsgvo" component = {Dsgvo}/>
          <Route path = "/profile/:userid" component = {Profile}/>
          <Route path = "/search/:query" component = {Search}/>
          <Route path = "/OverviewMyDocs" component = {MyDocsOverview}/>
          <Route path = "/OverviewMyPats" component = {MyPatsOverview}/>
          <Route path = "/SearchMyDocs/:query" component = {SearchMyDocs}/>
          <Route path = "/SearchMyPats/:query" component = {SearchMyPats}/>
          <Route path="/inline" render={() => (
            <div class="test">inline test</div>
          )}/>
          {/* keep '/' route at the bottom to avoid bugs */}
          <Route path = "/" component = {Login}/>
          <Route render={() =>(
            <div>404: Site doesn't exist</div>
          )}/>
        </Switch>
    </div>
  );
}

export default App;
