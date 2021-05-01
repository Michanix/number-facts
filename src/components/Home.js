/* eslint-disable require-jsdoc */
import React from 'react';
import NavBar from './NavBar';
import TabPanels from './TabPanels';
import {
  ThemeProvider,
  createMuiTheme,
  Switch,
  CssBaseline,
} from '@material-ui/core/';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: localStorage.getItem('darkMode') ?
      JSON.parse(localStorage.getItem('darkMode')) : false,
    };

    this.handleDarkMode = this.handleDarkMode.bind(this);
  }

  handleDarkMode(event) {
    const state = !this.state.darkMode;
    this.setState({darkMode: state});
    localStorage.setItem('darkMode', state);
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#0288d1',
        },
        secondary: {
          main: '#ff8f00',
        },
        type: this.state.darkMode ? 'dark' : 'light',
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <NavBar>
          <Switch
            checked={this.state.darkMode}
            onChange={this.handleDarkMode}/>
        </NavBar>
        <TabPanels />
      </ThemeProvider>
    );
  }
}
