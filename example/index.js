import React from 'react';
import { render } from 'react-dom';
import App from './src/App';

const renderApp = () => {
  render(
    <App />,
    document.getElementById('root')
  );
}

renderApp();

module.hot.accept(renderApp);
