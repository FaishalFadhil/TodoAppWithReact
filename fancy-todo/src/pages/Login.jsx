import React, {Component} from 'react';
import FormLogin from '../components/formLogin'
import { Box } from '@material-ui/core'
import axios from '../config/axiosInstance'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: ''
     }
  }
  async onSubmit(values) {
    console.log(values, 'valueszzzz');
    try {
      const {email, password} = values
      const login = await axios({
        method: 'post',
        url: '/login',
        data: {
          email,
          password
        }
      })
      console.log(login);
    } catch (error) {
      // console.log(error.response.data);
      this.setState({
        error: error.response.data
      })
    }
    // this.props.history.push('/')
  };
  render() { 
    return (
      <Box className="login" display="flex" justifyContent="center" alignItems="center" style={{height:'100vh'}}>
        <FormLogin 
        onSubmit={(values) => this.onSubmit(values)}
        error={this.state.error}
        />
      </Box>
      );
  }
}
 
export default Login;