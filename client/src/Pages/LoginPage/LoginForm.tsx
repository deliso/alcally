import './LoginForm.css';
import { Box, Button, Container, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { User } from '../../../../types/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../apiService/login.apiService';
import auth from '../../Utils/auth';

const initialState = {
  email: '',
};

type Props = {
  setIsAuthenticated: any;
};

const UserSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Type is required'),
});

interface IUser {
  name: string;
  email: string;
  password: string;
}

// id: string;
// actions!: Action[];

const LoginForm = (props: Props) => {
  let navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const setIsAuthenticated = props.setIsAuthenticated;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(UserSchema),
  });

  const onSubmit = async (data: any) => {
    const isValid = await UserSchema.isValid(data);
    if (isValid) {
      const res = await apiService.login(data);
      if (res.error) {
        alert(`${res.message}`);
      } else {
        setIsAuthenticated(true);
        auth.login(() => {});
      }
    }
  };
  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2} className='form-container'>
            {/* 'NAME'
                <TextField
                  variant='filled'
                  label='Name'
                  fullWidth
                  autoFocus
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors?.name && errors.name.message}
                /> */}
            {/* 'EMAIL' */}
            <TextField
              variant='filled'
              label='Email'
              fullWidth
              {...register('email')}
              error={!!errors.email}
              helperText={errors?.email && errors.email.message}
            />
            {/* 'PASSWORD' */}
            <TextField
              variant='filled'
              label='Password'
              type='password'
              fullWidth
              {...register('password')}
              error={!!errors.password}
              helperText={errors?.password && errors.password.message}
            />

            <Button size='small' variant='outlined'>
              Sign up
            </Button>
            <Button type='submit' size='small' variant='contained'>
              Log in
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default LoginForm;
