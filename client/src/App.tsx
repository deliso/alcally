import { CompanySelection } from './Pages/CompanyPage/CompanySelection';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import LandingPage from './Pages/LandingPage/LandingPage';

function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //utils file and import
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
        {isLoggedIn ? (
          <CompanySelection></CompanySelection>
        ) : (
          <LandingPage
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          ></LandingPage>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
