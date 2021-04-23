import {createMuiTheme} from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0288d1',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
