import React, {Component} from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import IconButton from '@material-ui/core/IconButton';
// import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import {
  Paper,
  Grid,
  Button,
  Box
} from '@material-ui/core';


class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     }
  }

  onSubmitChange(values){
    const obj = {
      id: this.props.data.id,
      title: values.title,
      description: values.description,
      due_date: values.dueDate
    }
    // console.log(this.props);
    this.props.onSubmitChange(obj)
  }

  toDoDone(event){
    event.preventDefault()
    console.log(this.props.data.id);
    const id = this.props.data.id
    // console.log(this.props);
    this.props.toDoDone(id)
  }

  deleteTask(event){
    event.preventDefault()
    const id = this.props.data.id
    // console.log(this.props);
    this.props.deleteTask(id)
  }

  render() { 
    return ( 
      <div style={{paddingTop:5, paddingBottom:5}}>
        {this.props.data.status === true ?
        <Accordion>
          <AccordionSummary
            aria-controls={`${this.props.data.id}content`}
            id={this.props.data.id}
          >
            <Card style={{display: 'flex', width:370}} elevation={0}>
              <CardContent style={{width:60, paddingTop:8, paddingLeft:10}}>
                <Checkbox
                disabled
                checked
                name="todoDone"
                /> 
              <IconButton component="span" onClick={(event)=>this.deleteTask(event)}>
                <DeleteTwoToneIcon/>
              </IconButton>
              </CardContent>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <CardContent style={{width:180, paddingLeft:5}}>
                  <Typography component="h6" variant="h6" align='left' style={{fontSize: 18}}>
                    {this.props.data.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" align='left'>
                    {this.props.data.description}
                  </Typography>
                </CardContent>
              </div>
              <CardContent style={{width: 130, paddingTop: 23, paddingLeft: 2, paddingRight: 2}}>
                <Typography variant="subtitle2" color="textSecondary">
                  {moment(this.props.data.due_date).format('MMMM Do YYYY')}
                </Typography>
              </CardContent>
            </Card>
          </AccordionSummary>
        </Accordion>
        :
        <Accordion expanded={this.props.expanded === this.props.data.id} onChange={this.props.handleChange(this.props.data.id)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${this.props.data.id}content`}
            id={this.props.data.id}
          >
            <Card style={{display: 'flex', width:370}} elevation={0}>
              <CardContent style={{width:60, paddingTop:8, paddingLeft:10}}>
                <Checkbox
                checked={false}
                onChange={(event) => this.toDoDone(event)}
                name="todoDone"
                />
              <IconButton component="span" onClick={(event)=>this.deleteTask(event)}>
                <DeleteTwoToneIcon/>
              </IconButton>
              </CardContent>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <CardContent style={{width:180, paddingLeft:5}}>
                  <Typography component="h6" variant="h6" align='left' style={{fontSize: 18}}>
                    {this.props.data.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" align='left'>
                    {this.props.data.description}
                  </Typography>
                </CardContent>
                <Typography variant="subtitle1" color="textSecondary" align='right' style={{fontSize: 12}}>
                    Click this card to edit
                </Typography>
              </div>
              <CardContent style={{width: 130, paddingTop: 23, paddingLeft: 2, paddingRight: 2}}>
                <Typography variant="subtitle2" color="textSecondary">
                  {moment(this.props.data.due_date).format('MMMM Do YYYY')}
                </Typography>
              </CardContent>
            </Card>
          </AccordionSummary>
          <AccordionDetails>
            <Form
              onSubmit={(values) => this.onSubmitChange(values)}
              initialValues={{ 
                title: this.props.data.title,
                dueDate: this.props.data.due_date.split('T')[0],
                description: this.props.data.description
              }}
              render={({ handleSubmit, submitting}) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Typography variant="h6" color="textSecondary" align='left' style={{paddingLeft:15}}>
                    Edit:
                  </Typography>
                  <Paper style={{ padding: 16}} elevation={0}>
                    <Grid container alignItems="flex-start" spacing={2}>
                      <Grid item xs={6}>
                        <Field
                          name="title"
                          fullWidth
                          required
                          component={TextField}
                          type="text"
                          label="Title"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          name="dueDate"
                          fullWidth
                          required
                          component={TextField}
                          type="date"
                          label="Due Date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          name="description"
                          fullWidth
                          required
                          component={TextField}
                          type="text"
                          label="Description"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box textAlign="left" style={{color:'red'}}>
                          <ul style={{listStyleType: 'none', paddingLeft: 0}}>
                            {this.props.error.map((e, idx) => {
                            return <li key={idx}>{e}</li>
                            })}
                          </ul>
                        </Box>
                      </Grid>
                      <Grid item style={{ marginTop: 1 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={submitting}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </form>
              )}
            />
          </AccordionDetails>
        </Accordion>
        
        }
        
      </div>
     );
  }
}
 
export default Task;
