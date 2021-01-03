import React, {Component} from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import {
  Paper,
  Grid,
  Button,
  CssBaseline,
  Box
} from '@material-ui/core';
import {Link} from 'react-router-dom'


class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() { 
    return ( 
      <React.Fragment>
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600}}>
          <CssBaseline />
          <Box fontSize="h4.fontSize" textAlign="left" m={1}>
            Register
          </Box>
          <Form
            onSubmit={(values) => this.props.onSubmit(values)}
            render={({ handleSubmit, form, submitting}) => (
              <form onSubmit={async event => {
                await handleSubmit(event)
                form.reset()
              }} noValidate>
                <Paper style={{ padding: 16 }}>
                  <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={6}>
                      <Field
                        name="firstName"
                        fullWidth
                        required
                        component={TextField}
                        type="text"
                        label="First Name"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="lastName"
                        fullWidth
                        component={TextField}
                        type="text"
                        label="Last Name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="email"
                        fullWidth
                        required
                        component={TextField}
                        type="email"
                        label="Email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        required
                        name="password"
                        component={TextField}
                        type="password"
                        label="Password - minimum 8 characters include number/symbol(s)"
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
                    <Grid item xs={12}>
                      <Box textAlign="left">Already have? click <Link to='/login' >Here</Link></Box>
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            )}
          />
        </div>
      </React.Fragment>
     );
  }
}
 
export default FormRegister;