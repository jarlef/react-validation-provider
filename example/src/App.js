import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { hot } from 'react-hot-loader'

import logo from './logo.svg';
import './App.css';

import BasicExample from './pages/basic';
import StyledExample from './pages/styled';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React Validation Provider!</h2>
        </div>

        <Tabs>
          <Tab label="Basic Example">
              <BasicExample />
          </Tab>
          <Tab label="Styled Example">
              <StyledExample />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default hot(module)(App);
