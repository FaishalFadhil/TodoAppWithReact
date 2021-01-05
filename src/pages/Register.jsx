import React, {Component} from 'react';
import FormRegister from '../components/formRegister'
import { Box } from '@material-ui/core'
import axios from '../config/axiosInstance'
import Navbar from '../components/navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      if (Register) {
        console.log(Register.data);
        toast.success('🦄 Success! you can login now ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.props.history.push('/login') 
      }
    } catch (error) {
      // console.log(error.response.data);
      switch (error.response.status) {
        case 400:
          this.setState({
            error: error.response.data.message
          })
          break;
        case 500:
          toast.error(`${error.response.data}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
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
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
          <Navbar component={Navbar}/>
          <Box className="register" display="flex" justifyContent="center" alignItems="center">
            <FormRegister 
            onSubmit={(values) => this.onSubmit(values)}
            error={this.state.error}
            />
          </Box>
        <ToastContainer />
      </React.Fragment>
      );
  }
}
 
export default Register;