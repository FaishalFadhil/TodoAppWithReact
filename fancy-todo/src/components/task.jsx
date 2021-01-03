import React, {Component} from 'react';
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

  render() { 
    return ( 
      <div >
        <Accordion expanded={this.props.expanded === 'panel1'} onChange={this.props.handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography >Task Your Task!</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Form
              onSubmit={(values) => this.props.onSubmit(values)}
              render={({ handleSubmit, form, submitting}) => (
                <form onSubmit={async event => {
                  await handleSubmit(event)
                  form.reset()
                }} noValidate>
                  <Paper style={{ padding: 16}}>
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
      </div>
     );
  }
}
 
export default Task;
