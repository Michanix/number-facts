/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import {Trans, withTranslation} from 'react-i18next';
import {makeRequest} from '../Utils';
import {
  Button,
  MenuItem,
  Select,
} from '@material-ui/core';

export default withTranslation()(class RandomsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({choice: event.target.value});
    event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = `/random/${this.state.choice}?json`;
    const data = makeRequest(this.props.instance, url);
    data.then((data) => {
      this.props.handleTextChange(data.data.text);
    });
  }

  render() {
    const {t} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Trans>
          <Select
            value={this.state.choice}
            onChange={this.handleChange}>
            <MenuItem value={'trivia'}>{t('trivia')}</MenuItem>
            <MenuItem value={'year'}>{t('year')}</MenuItem>
            <MenuItem value={'date'}>{t('dates')}</MenuItem>
            <MenuItem value={'math'}>{t('math')}</MenuItem>
          </Select>
          &nbsp;
          &nbsp;
          <Button
            type="submit"
            color="secondary"
            variant="contained">
            {t('button')}
          </Button>
          {this.props.children}
        </Trans>
      </form>
    );
  }
});
