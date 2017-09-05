import React, { Component } from 'react';
import LoginForm from './LoginForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
          <div className="container">
              <LoginForm initialValues={{name: 'Bob'}} />
          </div>
      </div>
    );
  }
}

export default App;
