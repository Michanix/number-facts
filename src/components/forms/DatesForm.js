/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import {makeRequest, between} from '../Utils';
import {Trans, withTranslation} from 'react-i18next';
import {
  Button,
  Input,
} from '@material-ui/core';
export default withTranslation()(class DatesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: null,
      month: null,
    };

    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDayChange(event) {
    this.setState({day: event.target.value});
  }

  handleMonthChange(event) {
    this.setState({
      month: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {day, month} = this.state;
    const parseDay = parseInt(day);
    const parseMonth = parseInt(month);

    if ((!isNaN(parseDay) && !isNaN(parseMonth))) {
      if (between(parseDay, 1, 31) && between(parseMonth, 1, 12)) {
        const url = `/${month}/${day}/date?json`;
        const data = makeRequest(this.props.instance, url);
        data.then((data) => {
          this.props.handleTextChange(data.data.text);
        });
        this.props.handleError(false, '');
      } else {
        this.props.handleError(true, 'Invalid date range.');
      }
    } else {
      this.props.handleError(true, 'Date must contain numeric values.');
    }
  }

  render() {
    const {day, month} = this.state;
    const {t} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Trans>
          <Input
            placeholder={t('day')}
            value={day}
            onChange={this.handleDayChange}/>
        &nbsp;
        &nbsp;
          <Input
            placeholder={t('month')}
            value={month}
            onChange={this.handleMonthChange}
          />
        &nbsp;
        &nbsp;
          <Button
            type="submit"
            color="secondary"
            variant="contained">
            {t('button')}
          </Button>
        </Trans>
        {this.props.children}
      </form>
    );
  }
});
