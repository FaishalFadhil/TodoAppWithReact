import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
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

export default App;
