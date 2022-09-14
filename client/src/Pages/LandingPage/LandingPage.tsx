import './LandingPage.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import LoginForm from '../LoginPage/LoginForm';
import { Person } from '@mui/icons-material';
import { signInWithGoogle } from '../../Firebase';
import { User } from '../../../../types/types';

type Props = {
  isAuthenticated: boolean;
  setIsAuthenticated: any;
};
export const LandingPage = (props: Props) => {
  const isAuthenticated = props.isAuthenticated;
  const setIsAuthenticated = props.setIsAuthenticated;
  const navigate = useNavigate();
  const [landing, setLanding] = useState(false);
  const [userData, setUserData] = useState<any>('');
  useEffect(() => {
    if (!isAuthenticated) {
      setLanding(true);
    }
  }, []);
  const handleHome = () => {
    setLanding(true);
    navigate('/', { replace: true });
  };
  const handleClick = async () => {
    const authorisedUser: User = await signInWithGoogle();
    if (authorisedUser?.id) setIsAuthenticated(true);
    // const newData: any = localStorage.getItem('userData');
    // const jsonData: any = JSON.parse(newData);
    // setUserData(jsonData);
    // console.log(jsonData);
    // setIsAuthenticated(true);
    // setLanding(false);
  };
  useEffect(() => {
    const userInfo: any = localStorage.getItem('userData');
    const jsonUser: any = JSON.parse(userInfo);
    if (jsonUser) setIsAuthenticated(true);
  }, []);

  return (
    <div className='app-container'>
      <nav className='navbar'>
        <button
          type='button'
          className='logo-button navbar-item logo'
          onClick={handleHome}
        >
          <img src={require('./../../Assets/logo3.png')} alt='logo'></img>
        </button>

        {isAuthenticated ? (
          <div className='navbar-item user'>
            <Avatar variant='circular' sx={{ bgcolor: '#6363f7' }}>
              <img src={userData.photoURL} alt='' />
              <Person sx={{ bgcolor: '#6363f7' }} />
            </Avatar>
          </div>
        ) : (
          <div className='navbar-item login'>
            <Button onClick={handleClick} variant='contained'>
              Sign in
            </Button>
          </div>
        )}
      </nav>

      <div>
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
          <img
            className='person-image'
            src='https://images.blush.design/f30508bc8fe32d732eabffdd23d7e835?w=original&cs=srgb'
            alt='person'
          ></img>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default LandingPage;
