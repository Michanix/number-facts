/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import AccordionDetails from '@material-ui/core/AccordionDetails';


export default class DatesAccordionForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container direction="row"
        justify="center" alignContent="center">
        <Grid item>
          <AccordionDetails>
            <Grid item xs={5}>
              <Input placeholder='Day'
                value={this.props.day}
                onChange={this.props.handleChange}/>
            </Grid>
            &nbsp;
            &nbsp;
            <Grid item xs={5}>
              <Input placeholder='Month'
                value={this.props.month}
                onChange={this.props.handleChange}/>
            </Grid>
            <Grid item xs={8}>
              <Button variant="contained"
                onClick={this.props.handleClick}>
                Give me some dates facts!
              </Button>
            </Grid>
          </AccordionDetails>
        </Grid>
      </Grid>
    );
  }
}
