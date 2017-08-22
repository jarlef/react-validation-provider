import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { setDefaultScopeOptions } from 'react-validation-provider';
import App from './App';

setDefaultScopeOptions({ manual: true });

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
