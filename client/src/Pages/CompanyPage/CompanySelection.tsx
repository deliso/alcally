import { useEffect, useState, createContext } from 'react';
import './CompanySelection.css';
import { Company } from '../../../../types/types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Select from '@mui/material/Select';
import { Container } from '@mui/system';
import { Avatar } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Person, PersonPinCircleRounded } from '@mui/icons-material';

export const CompanyContext = createContext<any>({});

type Props = {};
export const CompanySelection = (props: Props) => {
  //apiService + .env file
  const baseUrl = 'http://localhost:3001/';
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>();
  const [create, setCreate] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  // const [completed, setCompleted] = useState<boolean>(false);
  // const locationState = {
  //   company: selectedCompany,
  //   setCompleted: setCompleted,
  // };
  const handleChange = (e: any) => {
    if (e.target.value === 'create') {
      setCreate(true);
    }
    const selectedCompany: Company[] = companies.filter(
      (company) => company.id === e.target.value
    );
    setSelectedCompany(selectedCompany[0]);
    setShowWelcome(false);
  };
  const location = useLocation();
  useEffect(() => {
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
              <img src={require('./../../Assets/logo.png')} alt='logo'></img>
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
                      <CompanyContext.Provider value={selectedCompany}>
                        <Link
                          to={`/company/#${company.id}`}
                          state={{ company: company }}
                        >
                          {company.name}, {company.type}
                          {company.sole ? 'U' : ''}
                        </Link>
                      </CompanyContext.Provider>
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
              <Person sx={{ bgcolor: '#6363f7' }} />
            </Avatar>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
