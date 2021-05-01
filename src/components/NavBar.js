/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Trans, withTranslation} from 'react-i18next';
import {
  Typography,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
} from '@material-ui/core/';

const useStyles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: localStorage.getItem('lang') ?
      JSON.parse(localStorage.getItem('lang')) : 'en',
    };
    this.props.i18n.changeLanguage(this.state.lang);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const lang = event.target.value;
    localStorage.setItem('lang', JSON.stringify(lang));
    this.setState({lang: lang});
    this.props.i18n.changeLanguage(lang);
  }

  render() {
    const {classes, t} = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Trans>
              <Typography variant="h6" className={classes.title}>
                {t('title')}
              </Typography>
            </Trans>
            <Select
              value={this.state.lang}
              onChange={this.handleChange}
            >
              <MenuItem value={'ee'}>EE</MenuItem>
              <MenuItem value={'en'}>EN</MenuItem>
              <MenuItem value={'ru'}>RU</MenuItem>
            </Select>
            {this.props.children}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withTranslation()(withStyles(useStyles)(NavBar));
