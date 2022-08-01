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
import { Person } from '@mui/icons-material';

export const CompanyContext = createContext<any>({});

type Props = {};
export const CompanySelection = (props: Props) => {
  const baseUrl = 'http://localhost:3001/';
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>();
  const [create, setCreate] = useState<boolean>(false);
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
    <div>
      <div className='company-selection'>
        <CompanyContext.Provider value={selectedCompany}>
          <div className='navbar'>
            <div className='navbar-item logo'>
              <Link to={`/`}>
                <svg
                  width='38'
                  height='38'
                  viewBox='0 0 38 38'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g filter='url(#filter0_d_155_2647)'>
                    <circle cx='19' cy='18' r='18' fill='#115D5E' />
                  </g>
                  <path
                    d='M26.2371 24.0122L18.688 12.8202'
                    stroke='white'
                    stroke-width='2.25'
                  />
                  <path
                    d='M18.885 12.6205L11.3359 23.8126'
                    stroke='white'
                    stroke-width='2.25'
                  />
                  <path
                    d='M14.2221 26.6114C14.2221 26.6114 9.821 24.5586 8.12509 20.8056'
                    stroke='white'
                    stroke-width='2.25'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M29.7099 21.8838C29.7099 21.8838 26.6534 25.6576 22.6015 26.3952'
                    stroke='white'
                    stroke-width='2.25'
                  />
                  <circle cx='19.0256' cy='12.75' r='4.5' fill='white' />
                  <defs>
                    <filter
                      id='filter0_d_155_2647'
                      x='0.25'
                      y='0'
                      width='37.5'
                      height='37.5'
                      filterUnits='userSpaceOnUse'
                      color-interpolation-filters='sRGB'
                    >
                      <feFlood flood-opacity='0' result='BackgroundImageFix' />
                      <feColorMatrix
                        in='SourceAlpha'
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                        result='hardAlpha'
                      />
                      <feOffset dy='0.75' />
                      <feGaussianBlur stdDeviation='0.375' />
                      <feComposite in2='hardAlpha' operator='out' />
                      <feColorMatrix
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                      />
                      <feBlend
                        mode='normal'
                        in2='BackgroundImageFix'
                        result='effect1_dropShadow_155_2647'
                      />
                      <feBlend
                        mode='normal'
                        in='SourceGraphic'
                        in2='effect1_dropShadow_155_2647'
                        result='shape'
                      />
                    </filter>
                  </defs>
                </svg>
              </Link>
              <span>ALCALLY</span>
            </div>
            <Box className='selector' sx={{ width: 248 }}>
              <Avatar variant='circular'>
                {' '}
                <ApartmentIcon></ApartmentIcon>
              </Avatar>
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
                <InputLabel id='company-select-label'>
                  Select company
                </InputLabel>
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
                    if (company.name === 'ROMEL')
                      console.log('company', company);
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
              <span>Sergio Morales</span>
              <Avatar variant='circular'>
                <Person></Person>
              </Avatar>
            </div>
          </div>
          <Outlet />
        </CompanyContext.Provider>
      </div>
      {/* <img
        src='https://images.blush.design/A0lZAnpSJ42xF4cfTc1z?w=original&cs=srgb'
        alt='downtown'
      /> */}
    </div>
  );
};
