import './LoginForm.css';
import { Box, Button, Container, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { User } from '../../../../types/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  setIsLoggedIn: any;
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
  const setIsLoggedIn = props.setIsLoggedIn;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(UserSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoggedIn(true);
    //   console.log(data);
    //   const isValid = await DirectorSchema.isValid(data);
    //   if (isValid) {
    //     try {
    //       const inputDirector: Director = {
    //         ...data,
    //         id: '',
    //         active: true,
    //         expiry_year: Number(data.expiry_year) || 2100,
    //         expiry_month: Number(data.expiry_month) || 12,
    //         expiry_day: Number(data.expiry_day) || 31,
    //         body: body,
    //       };
    //       const responseDirector = await fetch(
    //         `http://localhost:3001/director/${id}`,
    //         {
    //           method: 'POST',
    //           headers: { 'Content-Type': 'application/json' },
    //           body: JSON.stringify(inputDirector),
    //         }
    //       );
    //       const jsonDirector = await responseDirector.json();
    //       setDirectors([...directors, jsonDirector]);
    //       setShowForm(false);
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
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
            {/* 'NIF' */}
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
