import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import Header from './content/Header';
import {Route, Link, Switch} from 'react-router-dom';

function App() {

var myVar = 2;

function changeColor(selector, color){
  var elem = document.getElementById("test");
  ReactDOM.findDOMNode(elem).style.color = color;
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          {/*in XML all tags need to be closed, that's why we use <br></br>*/}
          3*8 = {3*8}<br></br>
          {myVar > 1 ? 'myVar > 1' : ' myVar <= 1'}
          <div id="test">test</div>
          <button onClick={() => changeColor('#test', "blue")}>change font color</button>
          <button><Link to="/header">get header brö</Link></button>
          <div class="container-fluid">
            oytska se
          </div>
          {/*<Header />*/}
        </p>
        <Switch>
          <Route path ="/header" component = {Header}/>
          <Route path="/inline" render={() => (
            <div class="test">inline test</div>
          )}/>
          <Route render={() =>(
            <div>404: Site doesn't exist</div>
          )}/>
        </Switch>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
