import { useEffect, useState, createContext } from 'react';
import './CompanySelection.css';
import { Company } from '../../../../types/types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Select from '@mui/material/Select';

export const CompanyContext = createContext<any>({});

type Props = {};
export const CompanySelection = (props: Props) => {
  const baseUrl = 'http://localhost:3001/';
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>();
  const handleChange = (e: any) => {
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
  }, []);

  return (
    <div className='company-selection'>
      <CompanyContext.Provider value={selectedCompany}>
        <Box className='selector' sx={{ minWidth: 120 }}>
          <FormControl
            fullWidth
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderStyle: 'none',
              },
              ' & .MuiInputLabel-shrink': {
                color: 'transparent',
              },
            }}
          >
            <InputLabel id='company-select-label'>Select company</InputLabel>
            <Select
              labelId='company-select-label'
              id='company-select'
              label='Company'
              onChange={handleChange}
              defaultValue={location.hash.slice(1)}
            >
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
                Create a Company
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Outlet />
      </CompanyContext.Provider>
    </div>
  );
};
