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
      // console.log(login.data);
      localStorage.setItem('access_token', login.data.access_token)
      //fetch data
      this.props.history.push('/')
    } catch (error) {
      // console.log(error.response.data);
      this.setState({
        error: error.response.data
      })
    } finally {
      values.email = ''
      values.password = ''
    }
    // this.props.history.push('/')
  };
  render() { 
    return (
      <Box className="login" display="flex" justifyContent="center" alignItems="center" style={{height:'91.5vh'}}>
        <FormLogin 
        onSubmit={(values) => this.onSubmit(values)}
        error={this.state.error}
        />
      </Box>
      );
  }
}
 
export default Login;