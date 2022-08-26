import './CompanyForm.css';
import { ArrowBack, Rule, Send } from '@mui/icons-material';
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
import { Company, Director } from '../../../../types/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  companyId: string;
  companyBody: string;
  directors: Director[];
  setDirectors: any;
  setShowForm: any;
};
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

const DirectorSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  surname: yup.string().required('Surname is required'),
  role: yup.string().required('Type is required'),
  nif: yup.string().required('NIF is required'),
  appointment_year: yup
    .number()
    .typeError('Please enter a valid year')
    .integer('Please enter a valid year')
    .min(1900, 'Please enter a valid year')
    .max(2100, 'Please enter a valid year')
    .required('Year is required'),
  appointment_month: yup
    .number()
    .typeError('Please enter a valid month')
    .integer('Please enter a valid month')
    .min(1, 'Please enter a valid month')
    .max(12, 'Please enter a valid month')
    .required('Month is required'),
  appointment_day: yup
    .number()
    .typeError('Day must be a number')
    .integer('Please enter a valid day')
    .min(1, 'Please enter a valid day')
    .max(31, 'Please enter a valid day')
    .required('Month is required'),
  expiry_year: yup.string().default('2100'),
  // .typeError('Please enter a valid year')
  // .integer('Please enter a valid year')
  // .min(1900, 'Please enter a valid year')
  // .max(2100, 'Please enter a valid year'),
  expiry_month: yup.string().default('12'),
  // .typeError('Please enter a valid month')
  // .integer('Please enter a valid month')
  // .min(1, 'Please enter a valid month')
  // .max(12, 'Please enter a valid month'),
  expiry_day: yup.string().default('31'),
  // .typeError('Day must be a number')
  // .integer('Please enter a valid day')
  // .min(1, 'Please enter a valid day')
  // .max(31, 'Please enter a valid day'),
  dir_indef: yup.boolean().required(),
  dir_rem: yup.boolean().required(),
});

interface ICompanyForm {
  name: string;
  surname: string;
  role: string;
  nif: string;
  appointment_year: number;
  appointment_month: number;
  appointment_day: number;
  expiry_year?: string;
  expiry_month?: string;
  expiry_day?: string;
  dir_indef: boolean;
  dir_rem: boolean;
}

// id: string;
// actions!: Action[];

const DirectorForm = (props: Props) => {
  const setShowForm = props.setShowForm;
  const setDirectors = props.setDirectors;
  const directors = props.directors;
  const id = props.companyId;
  const body = props.companyBody;
  // const [mgmt, setMgmt] = useState('BOD');
  const [role, setRole] = useState('DIRECTOR');
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICompanyForm>({
    resolver: yupResolver(DirectorSchema),
  });

  // const handleMgmt = (event: any) => {
  //   setMgmt(event.target.value);
  //   setValue('mgmt', event.target.value, { shouldValidate: true });
  // };
  const handleRole = (event: any) => {
    setRole(event.target.value);
    setValue('role', event.target.value, { shouldValidate: true });
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    const isValid = await DirectorSchema.isValid(data);
    if (isValid) {
      try {
        const inputDirector: Director = {
          ...data,
          id: '',
          active: true,
          expiry_year: Number(data.expiry_year) || 2100,
          expiry_month: Number(data.expiry_month) || 12,
          expiry_day: Number(data.expiry_day) || 31,
          body: body,
        };
        const responseDirector = await fetch(
          `http://localhost:3001/director/${id}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputDirector),
          }
        );
        const jsonDirector = await responseDirector.json();
        setDirectors([...directors, jsonDirector]);
        setShowForm(false);
      } catch (e) {
        console.log(e);
      }
    }
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
                {/* 'SURNAME' */}
                <TextField
                  variant='filled'
                  label='Surname'
                  fullWidth
                  {...register('surname')}
                  error={!!errors.surname}
                  helperText={errors?.surname && errors.surname.message}
                />
                {/* 'NIF' */}
                <TextField
                  variant='filled'
                  label='NIF'
                  fullWidth
                  {...register('nif')}
                  error={!!errors.nif}
                  helperText={errors?.nif && errors.nif.message}
                />
              </div>
              {/* 'ROLE' */}
              <FormControl fullWidth {...register('role')}>
                {/* <InputLabel id='type'>Type</InputLabel> */}
                <Select
                  variant='filled'
                  labelId='role'
                  id='role'
                  value={role}
                  label='Role'
                  onChange={handleRole}
                  sx={{ paddingTop: '0px', paddingBottom: '8px' }}
                >
                  <MenuItem value={'DIRECTOR'}>Director</MenuItem>
                  <MenuItem value={'CHAIRMAN'}>Chairman</MenuItem>
                  <MenuItem value={'SECRETARY'}>Secretary</MenuItem>
                </Select>
              </FormControl>

              <div className='form-row'>
                {/* 'APPOINTMENT YEAR' */}
                <TextField
                  type='number'
                  InputProps={{ inputProps: { min: 2000, max: 2100 } }}
                  variant='filled'
                  label='Year'
                  fullWidth
                  {...register('appointment_year')}
                  error={!!errors.appointment_year}
                  helperText={
                    errors?.appointment_year && errors.appointment_year.message
                  }
                />
                {/* 'APPOINTMENT MONTH' */}
                <TextField
                  type='number'
                  InputProps={{ inputProps: { min: 1, max: 12 } }}
                  variant='filled'
                  label='Month'
                  fullWidth
                  {...register('appointment_month')}
                  error={!!errors.appointment_month}
                  helperText={
                    errors?.appointment_month &&
                    errors.appointment_month.message
                  }
                />
                {/* 'APPOINTMENT-DAY' */}
                <TextField
                  type='number'
                  InputProps={{ inputProps: { min: 1, max: 31 } }}
                  variant='filled'
                  label='Day'
                  fullWidth
                  {...register('appointment_day')}
                  error={!!errors.appointment_day}
                  helperText={
                    errors?.appointment_day && errors.appointment_day.message
                  }
                />
              </div>
              <div className='form-row'>
                {/* 'EXPIRY-YEAR' */}
                <TextField
                  type='number'
                  InputProps={{ inputProps: { min: 2000, max: 2100 } }}
                  variant='filled'
                  label='Year'
                  fullWidth
                  {...register('expiry_year')}
                  error={!!errors.expiry_year}
                  helperText={errors?.expiry_year && errors.expiry_year.message}
                />
                {/* 'EXPIRY-MONTH' */}
                <TextField
                  type='number'
                  InputProps={{ inputProps: { min: 1, max: 12 } }}
                  variant='filled'
                  label='Month'
                  fullWidth
                  {...register('expiry_month')}
                  error={!!errors.expiry_month}
                  helperText={
                    errors?.expiry_month && errors.expiry_month.message
                  }
                />
                {/* 'EXPIRY-DAY' */}
                <TextField
                  type='number'
                  InputProps={{ inputProps: { min: 1, max: 31 } }}
                  variant='filled'
                  label='Day'
                  fullWidth
                  {...register('expiry_day')}
                  error={!!errors.expiry_day}
                  helperText={errors?.expiry_day && errors.expiry_day.message}
                />
              </div>
              {/* 'DIR_REM' */}
              <div className='switch'>
                <FormControlLabel
                  id='dir_indef'
                  label='Was the director appointed for an indefinite period?'
                  labelPlacement='start'
                  control={<Switch {...register('dir_indef')} size='medium' />}
                  sx={{ 'margin-left': '0px' }}
                />
              </div>
              {/* 'DIR_REM' */}
              <div className='switch'>
                <FormControlLabel
                  id='dir_rem'
                  label='Does the director receive remuneration?'
                  labelPlacement='start'
                  control={<Switch {...register('dir_rem')} size='medium' />}
                  sx={{ 'margin-left': '0px' }}
                />
              </div>
              <div className='button-row form-row'>
                <Button
                  onClick={() => setShowForm(false)}
                  size='small'
                  variant='outlined'
                  sx={{ borderColor: '#6363f7', color: '#6363f7' }}
                  startIcon={<ArrowBack />}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  size='small'
                  variant='contained'
                  sx={{ backgroundColor: '#6363f7' }}
                  endIcon={<Send />}
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

export default DirectorForm;
