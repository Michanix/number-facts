/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import AccordionDetails from '@material-ui/core/AccordionDetails';

export default class AccordionForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container direction="row"
        justify="center" alignItems="center">
        <Grid item>
          <AccordionDetails>
            <Grid item xs>
              <Input placeholder={this.props.placeholder}
                value={this.props.number}
                onChange={this.props.handleChange}/>
            </Grid>
            <Grid item xs={8}>
              <Button variant="contained"
                onClick={this.props.handleClick}>
                Give me some {this.props.category} facts!
              </Button>
            </Grid>
          </AccordionDetails>
        </Grid>
      </Grid>
    );
  }
}
