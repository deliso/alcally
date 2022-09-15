import { useEffect, useState, createContext } from 'react';
import './CompanySelection.css';
import { Company } from '../../../../types/types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import { Container } from '@mui/system';
import { Avatar } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Person, PersonPinCircleRounded } from '@mui/icons-material';

type Props = {};
export const CompanySelection = (props: Props) => {
  //apiService + .env file
  const baseUrl = 'http://localhost:3001/';
  const [companies, setCompanies] = useState<Company[]>([]);
  const [userDetails, setUserDetails] = useState<any>({});
  const [selectedCompany, setSelectedCompany] = useState({});
  const [create, setCreate] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  // const [completed, setCompleted] = useState<boolean>(false);
  // const locationState = {
  //   company: selectedCompany,
  //   setCompleted: setCompleted,
  // };
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    if (e.target.value === 'create') {
      setCreate(true);
    }
    const selection = companies.filter(
      (company) => company.id === e.target.value
    ) as Company[];
    setSelectedCompany({ ...selection[0] });

    setShowWelcome(false);
    navigate(`/company/#${selection[0].id}`, {
      state: { company: selection[0] },
    });
  };
  const location = useLocation();
  useEffect(() => {
    const userInfo: any = localStorage.getItem('userData');
    const jsonUser: any = JSON.parse(userInfo);
    setUserDetails({ ...jsonUser });
    const getCompanies: () => Promise<void> = async () => {
      const companyData = await fetch(`${baseUrl}company`);
      const jsonCompanyData = await companyData.json();
      setCompanies([...jsonCompanyData]);
    };
    getCompanies();
    if (location.pathname === '/create') setCreate(true);
  }, []);

  return (
    <div className='app-container'>
      <div className='company-selection'>
        <div className='navbar'>
          <Link to={`/`}>
            <div className='navbar-item logo'>
              <img src={require('./../../Assets/logo3.png')} alt='logo'></img>
            </div>
          </Link>
          <Box className='selector' sx={{ width: 284 }}>
            {' '}
            <img
              className='company-logo'
              src='https://images.blush.design/mDnbV7zwvAFvfp85E0QG?w=original&cs=srgb'
              alt='company-logo'
            ></img>
            <FormControl
              fullWidth
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderStyle: 'none',
                },
                ' & .MuiInputLabel-shrink': {
                  display: 'none',
                },
                ' & .MuiInputLabel-root': {
                  display: 'none',
                },
                ' & .MuiInputLabel-formControl': {
                  display: 'none',
                },
                ' & .MuiFormLabel-root': {
                  display: 'none',
                },
                ' & .MuiInputLabel-filled': {
                  display: 'none',
                },
              }}
            >
              <InputLabel id='company-select-label'>Select company</InputLabel>
              {/* Outsource */}
              <Select
                labelId='company-select-label'
                id='company-select'
                label='Company'
                onChange={handleChange}
                defaultValue={
                  create ? 'create' : location.hash.slice(1) || 'select'
                }
              >
                <MenuItem value='select'>Select a company</MenuItem>
                {companies.map((company) => {
                  if (company.name === 'ROMEL') console.log('company', company);
                  return (
                    <MenuItem key={company.name} value={company.id}>
                      {company.name}, {company.type}
                      {company.sole ? 'U' : ''}
                    </MenuItem>
                  );
                })}
                <MenuItem id='create' value='create'>
                  <Link to={'/create'}>Create a company...</Link>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <div className='navbar-item user'>
            <Avatar variant='circular' sx={{ bgcolor: '#6363f7' }}>
              <img src={userDetails.photoURL} alt='' />
            </Avatar>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
