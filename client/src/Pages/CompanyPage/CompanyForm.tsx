import './CompanyForm.css';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Send from '@mui/icons-material/Send';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Company } from '../../../../types/types';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type Props = {};

const CompanyForm = (props: Props) => {
  const [companyData, setCompanyData] = useState({
    name: '',
    type: '',
    audit: '',
    year_end: 0,
    nif: '',
    cnae: '',
    sole: '' || false,
    mgmt: '',
    mgmt_rem: '',
    actions: [],
    id: '',
  });
  const { control, handleSubmit } = useForm<any>();
  let navigate = useNavigate();
  const onSubmit: SubmitHandler<any> = async (data, event) => {
    console.log('Query', data);
    const postCompany: Company = {
      name: data.name,
      type: data.type,
      audit: data.audit || false,
      year_end_month: 12,
      year_end_day: 31,
      nif: data.nif,
      cnae: data.cnae,
      sole: data.sole || false,
      mgmt: data.mgmt,
      mgmt_rem: data.mgmt_rem || false,
      actions: [],
      id: '',
    };
    const responseCompany = await fetch('http://localhost:3001/company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postCompany),
    });
    const jsonCompany = await responseCompany.json();
    console.log(jsonCompany);
    navigate(`/company/#${jsonCompany.id}`, {
      replace: true,
      state: { company: jsonCompany },
    });
  };
  const name = (
    <Controller
      name='name'
      control={control}
      defaultValue={''}
      render={({ field }) => {
        return (
          <>
            <InputLabel htmlFor='1'>Name</InputLabel>
            <FilledInput
              id='name'
              {...field}
              aria-describedby='company-name-helper'
            />
            <FormHelperText id='company-name-helper' className='helper'>
              Name of the company
            </FormHelperText>
          </>
        );
      }}
    />
  );
  const type = (
    <Controller
      name='type'
      control={control}
      defaultValue={''}
      render={({ field }) => {
        return (
          <FormControlLabel
            id='type'
            label='Type of the company'
            labelPlacement='top'
            control={
              <RadioGroup
                {...field}
                id='type'
                aria-labelledby='type'
                name='type'
              >
                <FormControlLabel
                  value='SA'
                  control={<Radio />}
                  label='Sociedad Anónima'
                />
                <FormControlLabel
                  value='SL'
                  control={<Radio />}
                  label='Sociedad Limitada'
                />
              </RadioGroup>
            }
          />
        );
      }}
    />
  );
  const audit = (
    <Controller
      name='audit'
      control={control}
      defaultValue={''}
      render={({ field }) => {
        return (
          <FormControlLabel
            id='audit'
            label='Does the company audit its annual accounts?'
            labelPlacement='start'
            control={<Switch {...field} size='medium' />}
            sx={{ 'margin-left': '0px' }}
          />
        );
      }}
    />
  );
  // const year_end = (
  //   <Controller
  //     name='year_end'
  //     control={control}
  //     defaultValue={''}
  //     render={({ field }) => {
  //       return (
  //         <>
  //           <InputLabel htmlFor='year_end'>End of Year</InputLabel>
  //           <FilledInput
  //             {...field}
  //             id='year_end'
  //             aria-describedby='company-year-end'
  //           />
  //           <FormHelperText id='company-year-end' className='helper'>
  //             End of the company's fiscal year
  //           </FormHelperText>
  //         </>
  //       );
  //     }}
  //   />
  // );
  const nif = (
    <Controller
      name='nif'
      control={control}
      defaultValue={''}
      render={({ field }) => {
        return (
          <>
            <InputLabel htmlFor='nif'>NIF</InputLabel>
            <FilledInput {...field} id='nif' aria-describedby='company-nif' />
            <FormHelperText id='company-nif' className='helper'>
              Spanish National Identification Number
            </FormHelperText>
          </>
        );
      }}
    />
  );
  const cnae = (
    <Controller
      name='cnae'
      control={control}
      defaultValue={''}
      render={({ field }) => {
        return (
          <>
            <InputLabel htmlFor='cnae'>CNAE</InputLabel>
            <FilledInput
              {...field}
              id='cnae'
              aria-describedby='company-cnae-helper'
            />
            <FormHelperText id='company-cnae-helper' className='helper'>
              CNAE Code
            </FormHelperText>
          </>
        );
      }}
    />
  );
  const sole = (
    <Controller
      name='sole'
      control={control}
      defaultValue={''}
      render={({ field }) => {
        return (
          <FormControlLabel
            id='sole'
            label='Is the company owned by a sole shareholder?'
            labelPlacement='start'
            control={<Switch {...field} size='medium' />}
            sx={{ 'margin-left': '0px' }}
          />
        );
      }}
    />
  );
  const mgmt = (
    <Controller
      name='mgmt'
      control={control}
      defaultValue={''}
      render={({ field }) => {
        return (
          <RadioGroup
            {...field}
            id='mgmt'
            aria-labelledby='demo-controlled-radio-buttons-group'
            name='controlled-radio-buttons-group'
          >
            <FormControlLabel
              value='S_D'
              control={<Radio />}
              label='Sole Director'
            />
            <FormControlLabel
              value='J_S_D'
              control={<Radio />}
              label='Joint and Several Directors'
            />
            <FormControlLabel
              value='J_D'
              control={<Radio />}
              label='Joint Directors'
            />
            <FormControlLabel
              value='BOD'
              control={<Radio />}
              label='Board of Directors'
            />
          </RadioGroup>
        );
      }}
    />
  );
  const mgmt_rem = (
    <Controller
      name='mgmt_rem'
      control={control}
      defaultValue={''}
      render={({ field }) => {
        return (
          <FormControlLabel
            id='mgmt_rem'
            label='Do any of the directors receive remuneration?'
            labelPlacement='start'
            control={<Switch {...field} size='medium' />}
            sx={{ 'margin-left': '0px' }}
          />
        );
      }}
    />
  );
  // const handleChange: () => void = () => {};
  // const handleSubmit: (e: any) => void = (e) => {
  //   console.log(e.target.value);
  // };
  return (
    <div className='form-modal'>
      <div className='form-container'>
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          <div>{name}</div>
          <div>{type}</div>
          <div>{audit}</div>
          {/* {year_end} */}
          <div>{nif}</div>
          <div>{cnae}</div>
          <div>{sole}</div>
          <div>{mgmt}</div>
          <div>{mgmt_rem}</div>
          <Stack direction='row' spacing={2} className='button-container'>
            <Button
              onClick={() => {}}
              size='small'
              variant='outlined'
              startIcon={<ArrowBack />}
            >
              Prev
            </Button>
            <Button
              type='submit'
              size='small'
              variant='contained'
              endIcon={<Send />}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
