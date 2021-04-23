/* eslint-disable require-jsdoc */
import React from 'react';
import Paper from '@material-ui/core/Paper';

import NavBar from './NavBar';
import CustomAccordion from './CustomAccodrion';
// TODO: add validation to inputs
// TODO: Add other lifecycles
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Paper elevation={0}>
          <NavBar />
          <CustomAccordion title='Math' category="math" />
          <CustomAccordion title='Trivia' />
          <CustomAccordion title='Dates' placeholder='Date' isDates={true}/>
        </Paper>
      </div>
    );
  }
}
