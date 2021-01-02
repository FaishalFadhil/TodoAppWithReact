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
    console.log(this.props);
  };
  render() { 
    return ( 
      <div style={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Typography edge="start" variant="h6">
              ToDo.co
            </Typography>
            <Typography variant="h6" style={{flexGrow: 1}}>
            </Typography>
            {this.props.auth && (
              <div>
                <Button
                  variant="outlined"
                  aria-haspopup="true"
                  onClick={(event) => this.handleMenu(event)}
                  color="inherit"
                >
                  Logout
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
     );
  }
  componentDidMount() {
    if (localStorage.getItem('access_token')) {
      this.props.change(true)
    } else {
      this.props.change(false)
    }
  }
}
 
export default Navbar;