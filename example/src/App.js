import React, {Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { setDefaultScopeOptions } from 'react-validation-provider';
import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

import './index.css';
import logo from './logo.svg';
import './App.css';

import BasicExample from './pages/basic';
import StyledExample from './pages/styled';

setDefaultScopeOptions({ manual: true });

class App extends Component {

  state = {
    tabIndex: 0
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React Validation Provider!</h2>
        </div>
        <Grid
  container
  direction="column"
  justify="center"
  alignItems="center"
>
        <Tabs value={this.state.tabIndex} onChange={(_, tabIndex) => this.setState({ tabIndex })}>
          <Tab label="Basic Example" />
          <Tab label="Styled Example" />
        </Tabs>

        { this.state.tabIndex == 0 ?  <BasicExample /> : null }
        { this.state.tabIndex == 1 ?  <StyledExample /> : null }
        </Grid>

      </div>
    );
  }
}

const BootstrappedApp = () => (
  <MuiThemeProvider theme={theme}>
    <App />  
  </MuiThemeProvider>
);


export default BootstrappedApp
