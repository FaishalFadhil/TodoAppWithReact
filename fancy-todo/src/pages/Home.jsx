import React, {Component} from 'react';
import Create from '../components/create'
import { Box } from '@material-ui/core'
import axios from '../config/axiosInstance'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: [],
      done: false,
      expanded: false
     }
  }

  handleChange = (panel) => (event, isExpanded) => {
    console.log(isExpanded);
    this.setState({
      expanded: isExpanded ? panel : false
    })
  };

  async onSubmit(values) {
    // console.log(values, 'valueszzzz');
    try {
      console.log(values);
      // const {title, dueDate, description} = values
      // const Home = await axios({
      //   method: 'post',
      //   url: '/',
      //   data: {
      //     title,
      //     description,
      //     due_date: dueDate
          
      //   }
      // })
      // console.log(Home.data);
      this.setState({
        expanded: false
      })
      this.setState({
        done: true
      })
    } catch (error) {
      // console.log(error.response.data);
      this.setState({
        error: error.response.data.message
      })
    } finally{
      values.title = ''
      values.dueDate = ''
      values.description = ''
    }
    // this.props.history.push('/')
  };
  render() { 
    return (
      <Box className="home" display="flex" justifyContent="center" alignItems="center" style={{minHeight:'91.5vh'}}>
        <Create
        expanded={this.state.expanded}
        handleChange={(values) => this.handleChange(values)}
        onSubmit={(values) => this.onSubmit(values)}
        done={this.state.done}
        error={this.state.error}
        />
      </Box>
      );
  }
}
 
export default Home;



// import React, {Component} from 'react';

// class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {  }
//   }
//   render() { 
//     return (
//       <div>
//         Ini Home page kata tio
//       </div>
//       );
//   }
// }
 
// export default Home;

