import './App.css';
import React, { Component } from 'react'
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register'
import AccessRoute from './helper/haveAccess'
import NotAccessRoute from './helper/haveNotAccess'
import { BrowserRouter as Router, Switch} from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isAutheticated: true
     }
  }
  change(value){
    this.setState({
      isAutheticated: value
    })
  };
  render() { 
    return (  
      <div className="App">
        <Router>
          <Switch>
            <NotAccessRoute
            exact path="/login" 
            component={Login} 
            />
            <AccessRoute 
            exact path="/" 
            component={Home} 
            />
            <NotAccessRoute
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
