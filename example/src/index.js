import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { setDefaultScopeOptions } from 'react-validation-provider';

setDefaultScopeOptions({ manual: true });

import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
