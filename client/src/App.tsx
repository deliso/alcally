import { CompanySelection } from './Pages/CompanyPage/CompanySelection';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  let theme = createTheme({
    palette: {
      primary: {
        main: '#6363f7',
      },
      secondary: {
        main: '#2c2094',
      },
      error: {
        main: '#e57373',
        contrastText: '#DFE1FB',
      },
    },
    typography: {
      fontFamily: [
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#DFE1FB',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <CompanySelection></CompanySelection>
      </div>
    </ThemeProvider>
  );
}

export default App;
