/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import {Trans, withTranslation} from 'react-i18next';

import {
  Button,
  Input,
} from '@material-ui/core';

export default withTranslation()(class SimpleForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.props.handleChange(event.target.value);
    event.preventDefault();
  }

  handleClick(event) {
    event.preventDefault();
    this.props.handleClick(this.props.number, this.props.category);
  }

  render() {
    const {t} = this.props;
    return (
      <form onSubmit={this.handleClick}>
        <Trans>
          <Input
            type="text"
            placeholder={t('placeholder')}
            value={this.props.number}
            onChange={this.handleChange}/>
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
