import React, {Component} from 'react';
import FormRegister from '../components/formRegister'
import { Box } from '@material-ui/core'
import axios from '../config/axiosInstance'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: []
     }
  }
  async onSubmit(values) {
    // console.log(values, 'valueszzzz');
    try {
      const {firstName, lastName, email, password} = values
      const Register = await axios({
        method: 'post',
        url: '/Register',
        data: {
          first_name: firstName,
          last_name: lastName,
          email,
          password
        }
      })
      console.log(Register.data);
      this.props.history.push('/login')
    } catch (error) {
      // console.log(error.response.data);
      switch (error.response.status) {
        case 400:
          this.setState({
            error: error.response.data.message
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
      <Box className="register" display="flex" justifyContent="center" alignItems="center" style={{height:'91.5vh'}}>
        <FormRegister 
        onSubmit={(values) => this.onSubmit(values)}
        error={this.state.error}
        />
      </Box>
      );
  }
}
 
export default Register;