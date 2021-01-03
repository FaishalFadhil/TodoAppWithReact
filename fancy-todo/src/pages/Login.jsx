import React, {Component} from 'react';
import FormLogin from '../components/formLogin'
import { Box } from '@material-ui/core'
import axios from '../config/axiosInstance'
import Navbar from '../components/navbar'

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
      localStorage.setItem('fullname', login.data.fullname)
      //fetch data
      this.props.history.push('/')
    } catch (error) {
      // console.log(error.response.data);
      switch (error.response.status) {
        case 401:
          this.setState({
            error: error.response.data
          })
          break;
        case 500:
          console.log(error.response.data);
          break;
        default:
          break;
      }
    } 
    // this.props.history.push('/')
  };
  render() { 
    return (
      <React.Fragment>
        <Navbar component={Navbar}/>
        <Box className="login" display="flex" justifyContent="center" alignItems="center">
          <FormLogin 
          onSubmit={(values) => this.onSubmit(values)}
          error={this.state.error}
          />
        </Box>
      </React.Fragment>
      );
  }
}
 
export default Login;