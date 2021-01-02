import './App.css';
import React, { Component } from 'react'
import Navbar from './components/navbar'
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isAutheticated: true
     }
  }
  logout(event){
    console.log('event.currentTarget');
  };
  change(value){
    this.setState({
      isAutheticated: value
    })
  };
  render() { 
    return (  
      <div className="App">
        <Router>
          <Navbar component={Navbar} 
          logout={(event) => this.logout(event)}
          change={(value) => this.change(value)}
          auth={this.state.isAutheticated}/>
          <Switch>
            <Route 
            exact path="/login" 
            component={Login} 
            />
            <Route 
            exact path="/" 
            component={Home} 
            />
            <Route 
            exact path="/register" 
            component={Register} 
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
 
export default App;
