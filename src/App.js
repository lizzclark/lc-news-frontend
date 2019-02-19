import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header.jsx';
import Nav from './Components/Nav.jsx';
import Main from './Components/Main.jsx';
import Footer from './Components/Footer.jsx';
import Auth from './Components/Auth';
import * as api from './api';

class App extends Component {
  state = { user: {} };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header />
        <Auth login={this.setUser} user={user}>
          <Nav user={user} logout={this.clearUser} />
          <Main className="main" />
        </Auth>
        <Footer />
      </div>
    );
  }
  setUser = username => {
    api.fetchUser(username).then(user => this.setState({ user }));
  };
  clearUser = () => {
    this.setState({ user: {} });
  };
}

export default App;
