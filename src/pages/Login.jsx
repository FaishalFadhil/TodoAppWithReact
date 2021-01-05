import React, {Component} from 'react';
import FormLogin from '../components/formLogin'
import { Box } from '@material-ui/core'
import axios from '../config/axiosInstance'
import Navbar from '../components/navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      if (login) {
        localStorage.setItem('access_token', login.data.access_token)
        localStorage.setItem('fullname', login.data.fullname)
        toast.success(`🦄 So.. welcome ${localStorage.getItem('fullname')}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        this.props.history.push('/')
      }
      //fetch data
    } catch (error) {
      // console.log(error.response.data);
      switch (error.response.status) {
        case 401:
          this.setState({
            error: error.response.data
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
          <Box className="login" display="flex" justifyContent="center" alignItems="center">
            <FormLogin 
            onSubmit={(values) => this.onSubmit(values)}
            error={this.state.error}
            />
          </Box>
        <ToastContainer />
      </React.Fragment>
    );
  }
}
 
export default Login;