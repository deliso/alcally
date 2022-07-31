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
    console.log(location.pathname);
    if (location.pathname === '/create') setCreate(true);
  }, []);

  return (
    <div className='company-selection'>
      <CompanyContext.Provider value={selectedCompany}>
        <div className='navbar'>
          <div className='navbar-item logo'>ALCALLY</div>
          <Box className='selector' sx={{ width: 248 }}>
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
                  return (
                    <MenuItem key={company.name} value={company.id}>
                      <CompanyContext.Provider value={selectedCompany}>
                        <Link
                          to={`/company/#${company.id}`}
                          state={{ company: company }}
                        >
                          {company.name}, {company.type}
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
          <div className='navbar-item user'>Sergio Morales</div>
        </div>
        <Outlet />
      </CompanyContext.Provider>
    </div>
  );
};
