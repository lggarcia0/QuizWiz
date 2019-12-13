import React, { Component } from 'react';
import '../node_modules/react-bulma-components/dist/react-bulma-components.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
//import { Link } from 'react-router-dom';
import Navigation from './components/layout/Navigation';


import './components/layout/appStyle.css'
import Home from './components/pages/Home'
import Signup from './components/pages/Signup';
import Axios from 'axios';
import Login from './components/pages/Login';
import User from './components/pages/User';
import AuthenticationComponent from './components/auth/AuthenticationComponent';
import {getJwt} from './components/helpers/jwt';
import Study from './components/pages/Study';




class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: {
        name: "User"
      }
    }
    //this.handleSuccess = this.handleSuccess.bind(this); 
  }
  componentDidMount() {
    const jwt = getJwt();
    //console.log(jwt);
    if (jwt) {
        Axios.get('http://localhost:5000/account/status', {headers: {Authorization: `Bearer ${jwt}`}}).then((res) => {
            this.setState({loggedIn: true, user: res.data.user});
        }).catch (error => {
          this.setState({loggedIn: false})
        });
    } else {
      this.setState({loggedIn: false})
    }
      
  }

  test = async () => {
    const jwt = getJwt();
    console.log(getJwt());
    Axios.post(`http://localhost:5000/public/decks/1234/isPublished`, {
      data: true},
      //type: 'merge'
      {headers: {Authorization: `Bearer ${getJwt()}`}});
     //{headers: {Authorization: `Bearer ${getJwt()}`}}).then( e => {
     // for (let [key, value] of Object.entries(e.data.result)) {
     //   console.log(`${key}: ${value.name}`);
     // }
    //}); 
    /*.then( e => {
      console.log(e.data.result);
      Axios.post(`http://localhost:5000/user/blue`, {
      //data:{test : {}, this: {}, out: {}},
      data: e.data.result.filter(check => check.id !== 1)
    }, {headers: {Authorization: `Bearer ${getJwt()}`}}); */
  }
  handleLogin = (user) => {
    this.setState({loggedIn: true, user: user});
  }
  handleLogout = () => {
    this.setState({loggedIn: false});
    localStorage.removeItem('jwt');
  }
  loginUser = async (username, password) => {
    const result = await Axios({
      method: 'post',
      url: 'http://localhost:5000/account/login',
      data: {
        name: username,
        pass: password,
      }
    });
    return result;
  }
  editUser = async (target) => {
    const result = await Axios.post('http://localhost:5000/user/userInfo/', {
      data: {target}},
      {headers: {Authorization: `Bearer ${getJwt()}`}});
    return result;
  }
  starter = async () => {
    const id = Date.now();
    const result = await Axios.post('http://localhost:5000/user/decks/' + id, {
      data: {name : "Starter Deck", author: "Tom from Myspace", cards: [{front: "1 + 1", back: "2"}, {front: "What is the capital of Europe", back: "Trick Question"}, {front: "What is meaning of life.", back: "42"}, {front: "What would YOU do for a butterfinger?", back: "I don't even know my self"}]}},
      {headers: {Authorization: `Bearer ${getJwt()}`}});
    return result;

  }
  // Create a New User
  createUser = async (username, password) => {
    const result = await Axios({
      method: 'post',
      url: 'http://localhost:5000/account/create',
      data: {
        name: username,
        pass: password,
      }
    });
    return result;
  } 


  render() {
    return (
      <Router>

        <div className="App has-background-custom">
          <Navigation loggedIn = {this.state.loggedIn} handleLogout = {this.handleLogout} test = {this.test}/>
          <div className="contentContainer">
            
            <div className="">
              <Route exact path = "/" render = {props => (

                  <React.Fragment>
                    <Home {...props} loggedIn = {this.state.loggedIn} />
                    <div>Hey!</div>
                  </React.Fragment>
              )} />
              <Route exact path ="/signup" render = {props => (
                <Signup createUser={this.createUser} loginUser = {this.loginUser} handleLogin = {this.handleLogin} editUser = {this.editUser} starter = {this.starter}/>
              )}/>
              <Route  exact path="/login" render = {props => (
                <Login loginUser = {this.loginUser} handleLogin = {this.handleLogin}/>
              )}/>
              <Route path ='/user' render = { props =>(
                <AuthenticationComponent handleLogin = {this.handleLogin}>
                    <User userInfo = {this.state.user} />
                </AuthenticationComponent>
              )}/>
              <Route  exact path="/study" render = {props => (
                <Study />
              )}/>
              <Route path = "/create" render = {props => (
                <AuthenticationComponent handleLogin = {this.handleLogin}>
                  <React.Fragment></React.Fragment>
                </AuthenticationComponent>
              )}/>
             
            </div>
          </div> 
        </div>
      </Router>

    );
  } 
}



export default App;
