import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { green, orange, lightBlue } from '@material-ui/core/colors';
import { dark } from '@material-ui/core/styles/createPalette';
import { typography } from 'material-ui/styles';

export const theme = createMuiTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
    },
    palette: {
        type: "dark",
        primary: {
            main: lightBlue[300],
        },
        secondary: {
            main: lightBlue[100],
        }
    }
});