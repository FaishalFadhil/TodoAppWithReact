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


class Create extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef()
    this.state = { 
     }
  }

  render() { 
    return ( 
      <div ref={this.wrapper} style={{width: 1000}}>
        <Accordion ref={this.wrapper} expanded={this.props.expanded === 'create'} onChange={this.props.handleChange('create')}>
          <AccordionSummary ref={this.wrapper}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="createbh-content"
            id="createbh-header"
          >
            <Typography >Create Your Task!</Typography>
          </AccordionSummary>
          <AccordionDetails ref={this.wrapper}>
            <Form
              onSubmit={(values) => this.props.onSubmit(values)}
              render={({ handleSubmit, form, submitting}) => (
                <form onSubmit={async event => {
                  await handleSubmit(event)
                  form.reset()
                }} noValidate>
                  <Paper style={{ padding: 16, width: 930 }} elevation={0}>
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
 
export default Create;
