import React, { Component } from 'react';
import './App.css';
import './Buttons.css';
import Header from './Components/Header.jsx';
import Nav from './Components/Nav.jsx';
import Main from './Components/Main.jsx';
import Footer from './Components/Footer.jsx';
import Auth from './Components/Auth';
import Sidebar from './Components/Sidebar';
import ErrorPage from './Components/ErrorPage';
import * as api from './api';
import { navigate } from '@reach/router';

class App extends Component {
  state = { user: {}, hasError: false };

  componentDidMount() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const localUser = JSON.parse(userString);
      this.setState({ user: localUser });
    }
  }
  render() {
    const { user, hasError } = this.state;
    if (hasError) return <ErrorPage message={"Can't load app"} />;
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
    api
      .getUser(username)
      .then(user => this.setState({ user }))
      .catch(err => this.setState({ hasError: true }));
  };
  clearUser = () => {
    navigate('/');
    this.setState({ user: {} });
  };
}

export default App;
