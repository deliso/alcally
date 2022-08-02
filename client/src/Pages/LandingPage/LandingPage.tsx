import './LandingPage.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import LoginForm from '../LoginPage/LoginForm';
import { Person } from '@mui/icons-material';

type Props = {
  isLoggedIn: boolean;
  setIsLoggedIn: any;
};
export const LandingPage = (props: Props) => {
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  const navigate = useNavigate();
  const [landing, setLanding] = useState(false);
  useEffect(() => {
    if (!isLoggedIn) {
      setLanding(true);
    }
  }, []);
  const handleHome = () => {
    setLanding(true);
    navigate('/', { replace: true });
  };
  const handleClick = () => {
    setLanding(false);
  };

  return (
    <div className='app-container'>
      <nav className='navbar'>
        <button
          type='button'
          className='logo-button navbar-item logo'
          onClick={handleHome}
        >
          <img src={require('./../../Assets/logo.png')} alt='logo'></img>
        </button>

        {isLoggedIn ? (
          <div className='navbar-item user'>
            <Avatar variant='circular' sx={{ bgcolor: '#6363f7' }}>
              <Person sx={{ bgcolor: '#6363f7' }} />
            </Avatar>
          </div>
        ) : (
          <div className='navbar-item login'>
            <Button onClick={handleClick} variant='contained'>
              Log in
            </Button>
          </div>
        )}
      </nav>

      <div>
        {landing ? (
          <div>
            <div className='main-text'>
              <div className='app-name'>ALCALLY</div>
              <div className='app-text'>
                Stay on top of your company's management needs and keep track of
                legal requirements ...all in one place.
              </div>
            </div>
            <img
              className='background-image'
              src='https://images.blush.design/A0lZAnpSJ42xF4cfTc1z?w=original&cs=srgb'
              alt='background'
            ></img>
          </div>
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn}></LoginForm>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default LandingPage;
