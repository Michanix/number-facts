/* eslint-disable require-jsdoc */
import React from 'react';
import {
  // Paper,
  ThemeProvider,
  createMuiTheme,
  Switch,
  CssBaseline,
} from '@material-ui/core/';

import NavBar from './NavBar';
import TabPanels from './TabPanels';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };
    this.handleDarkMode = this.handleDarkMode.bind(this);
  }

  handleDarkMode(event) {
    this.setState({darkMode: !this.state.darkMode});
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
