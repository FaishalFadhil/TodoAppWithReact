import React, {Component} from 'react';
import Create from '../components/create'
import Task from '../components/task'
import { Box, Grid } from '@material-ui/core'
import axios from '../config/axiosInstance'
import Typography from '@material-ui/core/Typography';
import Navbar from '../components/navbar'

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
  logout(){
    localStorage.clear()
    this.props.history.push('/login')
    // this.history.push('/login')
  };

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
        this.fetchTasks()
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

  async onSubmitChange(values) {
    // console.log(values, 'valueszzzz');
    try {
      console.log(values);
      const {id, title, due_date, description} = values
      const Home = await axios({
        method: 'put',
        url: `/todos/${id}`,
        data: {
          title,
          description,
          due_date
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
        this.fetchTasks()
        console.log('DONE!');
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

  async toDoDone(id) {
    // console.log(values, 'valueszzzz');
    try {
      this.setState({
        expanded: false
      })
      const Done = await axios({
        method: 'patch',
        url: `/todos/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      if (Done.data) {
        this.fetchTasks()
        console.log('DONE!');
      }
    } catch (error) {
      // console.log(error.response.status);
      switch (error.response.status) {
        case 404:
          console.log(error.response.message);
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

  async deleteTask(id) {
    // console.log(values, 'valueszzzz');
    try {
      this.setState({
        expanded: false
      })
      const Done = await axios({
        method: 'delete',
        url: `/todos/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      if (Done.data) {
        this.fetchTasks()
        console.log('DONE!');
      }
    } catch (error) {
      // console.log(error.response.status);
      switch (error.response.status) {
        case 404:
          console.log(error.response.message);
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
      <React.Fragment>
        <Navbar component={Navbar} logout={() => this.logout()}/>
        <Box className="home" display="flex" justifyContent="center" alignItems="center" style={{paddingTop:100}}>
          <Grid>
            <Typography component="h5" variant="h5" style={{paddingBottom:10}}>
              Do you have plan to do in coming days?
            </Typography>
            <Create
            expanded={this.state.expanded}
            handleChange={(values) => this.handleChange(values)}
            onSubmit={(values) => this.onSubmit(values)}
            done={this.state.done}
            error={this.state.error}
            />
            <Grid container alignItems="flex-start" style={{paddingTop: 50, width:1000}}>
              <Grid item xs={5}>
                <Typography component="h5" variant="h5">
                  Tasks To Do
                </Typography>
                {this.state.tasksNotDone.map((e, idx) => <Task
                key={idx}
                expanded={this.state.expanded}
                handleChange={(values) => this.handleChange(values)}
                onSubmitChange={(values) => this.onSubmitChange(values)}
                deleteTask={(id) => this.deleteTask(id)}
                toDoDone={(id) => this.toDoDone(id)}
                data={e}
                error={this.state.error}
                />)}
                <p>{this.state.isFetching ? 'Fetching tasks...' : ''}</p>
              </Grid>
              <Grid item xs={2}/>
              <Grid item xs={5}>
                <Typography component="h5" variant="h5">
                  Tasks Done
                </Typography>
                {this.state.tasksDone.map((e, idx) => <Task
                key={idx}
                deleteTask={(id) => this.deleteTask(id)}
                data={e}
                />)}
                <p>{this.state.isFetching ? 'Fetching tasks...' : ''}</p>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
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

