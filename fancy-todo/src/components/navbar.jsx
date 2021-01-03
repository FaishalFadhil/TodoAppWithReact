import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  handleMenu(event){
    event.preventDefault()
    this.props.logout()
  };
  render() { 
    return ( 
      <div style={{flexGrow: 1}}>
        <AppBar position="fixed" style={{backgroundColor:'#ffd369', color:'#393e46'}}>
          <Toolbar>
            <Typography edge="start" variant="h6">
              ToDo.co
            </Typography>
            <Typography variant="h6" style={{flexGrow: 1}}>
                {localStorage.getItem('access_token') ? `Welcome ${localStorage.getItem('fullname')}! Here's your tasks` : ''}
            </Typography>
            {localStorage.getItem('access_token') && (
              <Button
              variant="outlined"
              onClick={(event) => this.handleMenu(event)}
              color="inherit"
              >
                Logout
              </Button> 
            )}
          </Toolbar>
        </AppBar>
      </div>
     );
  }
}
 
export default Navbar;