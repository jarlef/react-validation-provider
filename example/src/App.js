import React, { Component } from 'react';
import './App.css';
import MyForm from './MyForm';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React!</h2>
        </div>
       <MyForm />
      </div>
    );
  }
}

export default App;
