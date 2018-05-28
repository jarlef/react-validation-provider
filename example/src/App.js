import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { setDefaultScopeOptions } from 'react-validation-provider';

import './index.css';

import logo from './logo.svg';
import './App.css';

import BasicExample from './pages/basic';
import StyledExample from './pages/styled';

setDefaultScopeOptions({ manual: true });

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

const BootstrappedApp = () => (
  <MuiThemeProvider>
    <App />  
  </MuiThemeProvider>
);


export default BootstrappedApp
