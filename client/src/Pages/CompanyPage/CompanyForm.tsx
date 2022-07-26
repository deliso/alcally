import './CompanyForm.css';
import {
  ArrowBack,
  ArrowForward,
  Send,
  SystemSecurityUpdateSharp,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  MenuItem,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
  withStyles,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Company } from '../../../../types/types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const theme = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          'align-items': 'center',
        },
      },
    },
  },
});
//import from utils
const CompanySchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  type: yup.string().required('Type is required'),
  nif: yup.string().required('NIF is required'),
  cnae: yup
    .number()
    .typeError('CNAE must be a number')
    .positive('CNAE must be positive')
    .integer('CNAE must be an integer')
    .min(1000, 'CNAE must be 4 digits long')
    .max(9999, 'CNAE must be 4 digits long')
    .required('CNAE is required'),
  year_end_month: yup
    .number()
    .typeError('Month must be a number')
    .integer('Please enter a valid month')
    .min(1, 'Please enter a valid month')
    .max(12, 'Please enter a valid month')
    .required('Month is required'),
  year_end_day: yup
    .number()
    .typeError('Day must be a number')
    .integer('Please enter a valid day')
    .min(1, 'Please enter a valid day')
    .max(31, 'Please enter a valid day')
    .required('Day is required'),
  sole: yup.boolean().required(),
  audit: yup.boolean().required(),
  mgmt: yup.string().required('Management type is required'),
  mgmt_rem: yup.boolean().required(),
  mgmt_num: yup.number().required(),
});
//replace by type
interface ICompanyForm {
  name: string;
  type: string;
  nif: string;
  cnae: number;
  year_end_month: number;
  year_end_day: number;
  sole: boolean;
  audit: number;
  mgmt: number;
  mgmt_rem: boolean;
  mgmt_num: number;
}

// id: string;
// actions!: Action[];

const CompanyForm = (props: Props) => {
  const [mgmt, setMgmt] = useState('BOD');
  const [type, setType] = useState('SA');
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICompanyForm>({
    resolver: yupResolver(CompanySchema),
  });
  const handleMgmt = (event: any) => {
    setMgmt(event.target.value);
    setValue('mgmt', event.target.value, { shouldValidate: true });
  };
  const handleType = (event: any) => {
    setType(event.target.value);
    setValue('type', event.target.value, { shouldValidate: true });
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    const isValid = await CompanySchema.isValid(data);
    if (isValid) {
      try {
        const inputCompany: Company = {
          ...data,
          actions: [],
          directors: [],
          id: '',
        };
        console.log(inputCompany);
        const responseCompany = await fetch('http://localhost:3001/company', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputCompany),
        });
        const jsonCompany = await responseCompany.json();
        console.log(jsonCompany);
        navigate(`/company/#${jsonCompany.id}`, {
          replace: true,
          state: { company: jsonCompany },
        });
      } catch (e) {
        console.log(e);
      }
    }
    // if (isValid) {
    //   const inputCompany: Company = {
    //     ...data,
    //     actions: [],
    //     id: '',
    //   };
    //   console.log(inputCompany);
    //   const responseCompany = await fetch('http://localhost:3001/company', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(inputCompany),
    //   });
    //   const jsonCompany = await responseCompany.json();
    //   console.log(jsonCompany);
    //   navigate(`/company/#${jsonCompany.id}`, {
    //     replace: true,
    //     state: { company: jsonCompany },
    //   });
    // }
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2} className='form-container'>
              <div className='form-row'>
                {/* 'NAME' */}
                <TextField
                  variant='filled'
                  label='Name'
                  fullWidth
                  autoFocus
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors?.name && errors.name.message}
                />
                {/* 'TYPE' */}
                <FormControl fullWidth {...register('type')}>
                  {/* <InputLabel id='type'>Type</InputLabel> */}
                  <Select
                    variant='filled'
                    labelId='type'
                    id='type'
                    value={type}
                    label='Type'
                    onChange={handleType}
                  >
                    <MenuItem value={'SA'}>Sociedad Anónima</MenuItem>
                    <MenuItem value={'SL'}>Sociedad Limitada</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='form-row'>
                {/* 'NIF' */}
                <TextField
                  variant='filled'
                  label='NIF'
                  fullWidth
                  {...register('nif')}
                  error={!!errors.nif}
                  helperText={errors?.nif && errors.nif.message}
                />
                {/* 'CNAE' */}
                <TextField
                  variant='filled'
                  label='CNAE'
                  fullWidth
                  {...register('cnae')}
                  error={!!errors.cnae}
                  helperText={errors?.cnae && errors.cnae.message}
                />
              </div>

              <div className='form-row'>
                {/* 'YEAR-END-MONTH' */}
                <TextField
                  type='number'
                  InputProps={{ inputProps: { min: 1, max: 12 } }}
                  variant='filled'
                  label='End of Tax Year (Month)'
                  fullWidth
                  {...register('year_end_month')}
                  error={!!errors.year_end_month}
                  helperText={
                    errors?.year_end_month && errors.year_end_month.message
                  }
                />
                {/* 'YEAR-END-DAY' */}
                <TextField
                  type='number'
                  InputProps={{ inputProps: { min: 1, max: 31 } }}
                  variant='filled'
                  label='End of Tax Year (Day)'
                  fullWidth
                  {...register('year_end_day')}
                  error={!!errors.year_end_day}
                  helperText={
                    errors?.year_end_day && errors.year_end_day.message
                  }
                />
              </div>
              <div className='form-row'>
                {/* 'MGMT' */}
                <FormControl fullWidth {...register('mgmt')}>
                  {/* <InputLabel id='mgmt'>Management Body</InputLabel> */}
                  <Select
                    variant='filled'
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={mgmt}
                    label='mgmt'
                    onChange={handleMgmt}
                  >
                    <MenuItem value={'BOD'}>Board of Directors</MenuItem>
                    <MenuItem value={'J_D'}>Joint Director</MenuItem>
                    <MenuItem value={'J_S_D'}>
                      Joint and Several Director
                    </MenuItem>
                    <MenuItem value={'S_D'}>Sole Director</MenuItem>
                  </Select>
                </FormControl>
                {/* 'MGMT_NUM' */}
                <TextField
                  type='number'
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                  variant='filled'
                  label='Number of Directors'
                  fullWidth
                  {...register('mgmt_num')}
                  error={!!errors.mgmt_num}
                  helperText={errors?.mgmt_num && errors.mgmt_num.message}
                />
              </div>
              {/* 'SOLE' */}
              <div className='switch'>
                <FormControlLabel
                  id='sole'
                  label='Is the Company owned by a sole shareholder?'
                  labelPlacement='start'
                  control={<Switch {...register('sole')} size='medium' />}
                  sx={{ 'margin-left': '0px' }}
                />
              </div>
              {/* 'AUDIT' */}
              <div className='switch'>
                <FormControlLabel
                  id='audit'
                  label='Does the company audit its annual accounts?'
                  labelPlacement='start'
                  control={<Switch {...register('audit')} size='medium' />}
                  sx={{ 'margin-left': '0px' }}
                />
              </div>
              {/* 'MGMT_REM' */}
              <div className='switch'>
                <FormControlLabel
                  id='mgmt_rem'
                  label='Do the director/s receive remuneration?'
                  labelPlacement='start'
                  control={<Switch {...register('mgmt_rem')} size='medium' />}
                  sx={{ 'margin-left': '0px' }}
                />
              </div>
              <div className='button-row form-row'>
                <Button
                  onClick={() => {}}
                  size='small'
                  variant='outlined'
                  color='primary'
                  startIcon={<ArrowBack />}
                >
                  <Link to={'/'}>Cancel</Link>
                </Button>
                <Button
                  type='submit'
                  size='small'
                  variant='outlined'
                  endIcon={<ArrowForward />}
                >
                  Submit
                </Button>
              </div>
            </Box>
          </form>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default CompanyForm;
