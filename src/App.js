import React, { Component } from 'react';
import './App.css';
import './Buttons.css';
import Header from './Components/Header.jsx';
import Nav from './Components/Nav.jsx';
import Main from './Components/Main.jsx';
import Footer from './Components/Footer.jsx';
import Auth from './Components/Auth';
import Sidebar from './Components/Sidebar';
import * as api from './api';

class App extends Component {
  state = { user: {} };

  componentDidMount() {
    const userString = localStorage.getItem('user');
    const localUser = JSON.parse(userString);
    this.setState({ user: localUser });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header />
        <Nav user={user} />
        <Auth login={this.setUser} user={user}>
          <Main className="main" user={user} />
          <Sidebar user={user} logout={this.clearUser} />
        </Auth>
        <Footer />
      </div>
    );
  }
  setUser = username => {
    api.getUser(username).then(user => this.setState({ user }));
  };
  clearUser = () => {
    this.setState({ user: {} });
  };
}

export default App;
