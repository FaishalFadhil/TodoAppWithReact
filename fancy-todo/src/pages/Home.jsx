import React, {Component} from 'react';
import Create from '../components/create'
import Task from '../components/task'
import { Box, Grid } from '@material-ui/core'
import axios from '../config/axiosInstance'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: [],
      expanded: false,
      isFetching: false,
      tasksDone: [],
      tasksNotDone: [],
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
      const {title, dueDate, description} = values
      const Home = await axios({
        method: 'post',
        url: '/todos',
        data: {
          title,
          description,
          due_date: dueDate
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      console.log(Home.data);
      if (Home.data) {
        this.setState({
          expanded: false,
          error: []
        })
      }
    } catch (error) {
      // console.log(error.response.status);
      switch (error.response.status) {
        case 401:
          console.log(error.response.data);
          break;
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

  async fetchTasks() {
    this.setState({
      isFetching: true
    })
    // console.log(values, 'valueszzzz');
    try {
      const Home = await axios({
        method: 'get',
        url: '/todos',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      if (Home.data) {
        const {data} = Home
        let notDone = data.filter(e => e.status === false)
        let Done = data.filter(e => e.status === true)
        // console.log(Array.isArray(notDone), Done);
        this.setState({
          tasksNotDone: notDone,
          tasksDone: Done,
          isFetching: false
        })
      }
    } catch (error) {
      // console.log(error.response.status);
      switch (error.response.status) {
        case 401:
          console.log(error.response.data);
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
      <Box className="home" display="flex" justifyContent="center" alignItems="center" style={{minHeight:'91.5vh'}}>
        <Grid>
          <Create
          expanded={this.state.expanded}
          handleChange={(values) => this.handleChange(values)}
          onSubmit={(values) => this.onSubmit(values)}
          done={this.state.done}
          error={this.state.error}
          />
          <Grid container alignItems="flex-start" spacing={2} style={{padding: 50, width:800}}>
            <Grid item xs={6}>
              Tasks To Do
              {this.state.tasksNotDone.length > 0 ? <Task
              expanded={this.state.expanded}
              handleChange={(values) => this.handleChange(values)}
              onSubmit={(values) => this.onSubmit(values)}
              done={this.state.done}
              error={this.state.error}
              /> : ''}
              <p>{this.state.isFetching ? 'Fetching tasks...' : ''}</p>
            </Grid>
            <Grid item xs={6}>
              Tasks Done
              {this.state.tasksDone.map(e => <Task
              expanded={this.state.expanded}
              handleChange={(values) => this.handleChange(values)}
              onSubmit={(values) => this.onSubmit(values)}
              done={this.state.done}
              error={this.state.error}
              />)}
              <p>{this.state.isFetching ? 'Fetching tasks...' : ''}</p>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      );
  }
  componentDidMount() {
    this.fetchTasks()
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

