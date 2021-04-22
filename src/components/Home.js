/* eslint-disable require-jsdoc */
import React from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import NavBar from './NavBar';

const isntance = axios.create({
  baseURL: 'http://numbersapi.com',
  headers: {'Content-Type': 'application/json'},
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentDidMount() {
    isntance
        .get('/12/year?json')
        .then((res) => {
          this.setState({data: res.data.text});
        })
        .catch((err) => console.error(err));
  }

  render() {
    return (
      <div>
        <Paper elevation={0}>
          <NavBar />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="">Math</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField id="outlined-basic" label="Outlined"
                variant="outlined" />
              <Button variant="contained">Give me some facts!</Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className="">Trivia</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {this.state.data}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className="">Dates</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {this.state.data}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </div>
    );
  }
}
