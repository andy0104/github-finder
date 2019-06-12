import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlertMsg] = useState(null);
  
  // Get single github user
  const getUser = async (gitUsername) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${gitUsername}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);    
    setLoading(false);
    setUser(res.data);
  }

  // Get user repos
  const getUserRepos = async (gitUsername) => {    
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${gitUsername}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setLoading(false);
    setRepos(res.data);
  }

  const clearUsers = () => {
    setLoading(false);
    setUsers([]);
  }

  const setAlert = (msg, type) => {
    setAlertMsg({ msg, type });
    setTimeout(() =>(setAlertMsg(null)), 5000);
  }
     
  return (
    <Fragment>
      <GithubState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert alert={alert} />
              <Switch>
                <Route exact path="/" render={props => (
                  <Fragment>
                    <Search                      
                      clearUsers={clearUsers} 
                      showClear={ users.length > 0 ?true : false } 
                      setAlert={setAlert} />
                    <Users 
                      loading={loading} 
                      users={users} />
                  </Fragment>
                )} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" render={props => (
                  <User 
                    {...props} 
                    getUser={getUser} 
                    getUserRepos={getUserRepos} 
                    repos={repos} 
                    user={user} 
                    loading={loading} />
                )} />
              </Switch>              
            </div>          
          </div>
        </Router>
      </GithubState>
    </Fragment>
  );
}

export default App;
