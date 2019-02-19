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
        <Nav user={user} logout={this.clearUser} />
        <Auth login={this.setUser} user={user}>
          <Main className="main" user={user} />
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
