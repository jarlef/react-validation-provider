import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { setDefaultScopeOptions } from 'react-validation-provider';
import App from './App';

setDefaultScopeOptions({ manual: true });

const BootstrappedApp = () => (
  <MuiThemeProvider>
    <App />  
  </MuiThemeProvider>
);

ReactDOM.render(
  <BootstrappedApp />,
  document.getElementById('root')
);
