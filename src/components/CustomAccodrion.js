/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionForm from './AccordionForm';
import DatesAccordionForm from './DatesAccordionForm';

const isntance = axios.create({
  baseURL: 'http://numbersapi.com',
});

function buildRoute(params) {
  let url = `/${params.number}`;
  switch (params.category) {
    case undefined:
      url += '/?json';
      break;
    default:
      url += `/${params.category}?json`;
      break;
  }

  return url;
}

function buildRouteDates(params) {
  return `/${params.day}/${params.month}/date?json`;
}

async function makeRequest(url) {
  let data;

  try {
    data = await isntance.get(url);
  } catch (err) {
    console.error(err);
  }

  return data;
}

export default class CustomAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      number: '',
      isDates: this.props.isDates,
      day: '',
      month: '',
    };

    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleClickNumber = this.handleClickNumber.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleClickDate = this.handleClickDate.bind(this);
  }

  handleChangeNumber(event) {
    this.setState({number: event.target.value});
  }

  handleClickNumber(event) {
    const params = {
      number: this.state.number,
      category: this.props.category,
    };
    const url = buildRoute(params);
    const data = makeRequest(url);
    data.then((data) => {
      this.setState({data: data.data.text});
    });
    event.preventDefault();
  }

  handleChangeDate(event) {
    this.setState({
      day: event.target.value,
      month: event.target.value,
    });
  }

  handleClickDate(event) {
    const params = {
      day: this.state.day,
      month: this.state.month,
    };
    const url = buildRouteDates(params);
    const data = makeRequest(url);
    data.then((data) => {
      this.setState({data: data.data.text});
    });
    event.preventDefault();
  }

  render() {
    const title = this.props.title;
    const category = title.toLowerCase();
    const placeholder = this.props.placeholder == undefined ? 'Number' :
    this.props.placeholder;
    const {isDates} = this.state;

    return (
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography variant="h4" style={{flex: 1}}>
              {title}
            </Typography>
          </AccordionSummary>
          {isDates ?
          <DatesAccordionForm
            handleChange={this.handleChangeDate}
            handleClick={this.handleClickDate}
          /> :
          <AccordionForm
            handleChange={this.handleChangeNumber}
            handleClick={this.handleClickNumber}
            category={category}
            placeholder={placeholder}/>
          }
          <Typography variant="h6">{this.state.data}</Typography>
        </Accordion>
      </div>
    );
  }
}
