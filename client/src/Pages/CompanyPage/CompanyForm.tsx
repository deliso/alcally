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

type Props = {};

const pageMap: any = {
  name: 'name',
  type: 'type',
  audit: 'audit',
  year_end: 'year_end',
  nif: 'nif',
  cnae: 'cnae',
  sole: 'sole',
  mgmt: 'mgmt',
  mgmt_rem: 'mgmt_rem',
};

const CompanyForm = (props: Props) => {
  const [formPage, setFormPage] = useState(1);
  const [companyData, setCompanyData] = useState({
    name: '',
    type: 'SL',
    audit: false,
    year_end: 0,
    nif: '',
    cnae: '',
    sole: false,
    mgmt: 'S_D',
    mgmt_rem: false,
    id: '',
    actions: [],
  } as Company);
  const { control, handleSubmit } = useForm<any>();
  const onSubmit: SubmitHandler<any> = async (data, event) => {
    console.log(data.type);
    setCompanyData((prev) => {
      return {
        ...prev,
        name: data.name,
        type: data.type,
        audit: data.audit,
        year_end: Number(data.year_end),
        nif: data.nif,
        cnae: data.cnae,
        sole: data.sole,
        mgmt: data.mgmt,
        mgmt_rem: data.mgmt_rem,
      };
    });
    const postCompany = await fetch('http://localhost:3001/company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(companyData),
    });
    console.log(postCompany);
  };
  // const handleClick = () => {
  //   console.log('send', companyData);
  // };
  const name = (
    <Controller
      name='name'
      control={control}
      defaultValue={companyData.name ? companyData.name : ''}
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
      defaultValue={companyData.type !== undefined ? companyData.type : ''}
      render={({ field }) => {
        return (
          <>
            <InputLabel htmlFor='type'>Type</InputLabel>
            <FilledInput
              {...field}
              id='type'
              aria-describedby='company-type-helper'
            />
            <FormHelperText id='company-type-helper' className='helper'>
              Type of the Company
            </FormHelperText>
          </>
        );
      }}
    />
  );
  const audit = (
    <Controller
      name='audit'
      control={control}
      defaultValue={companyData.year_end ? companyData.year_end : ''}
      render={({ field }) => {
        return (
          <FormControlLabel
            id='audit'
            label='Does the company audit its annual accounts?'
            labelPlacement='start'
            control={<Switch {...field} size='medium' />}
          />
        );
      }}
    />
  );
  const year_end = (
    <Controller
      name='year_end'
      control={control}
      defaultValue={companyData.year_end ? companyData.year_end : ''}
      render={({ field }) => {
        return (
          <>
            <InputLabel htmlFor='year_end'>End of Year</InputLabel>
            <FilledInput
              {...field}
              id='year_end'
              aria-describedby='company-year-end'
            />
            <FormHelperText id='company-year-end' className='helper'>
              End of the company's fiscal year
            </FormHelperText>
          </>
        );
      }}
    />
  );
  const nif = (
    <Controller
      name='nif'
      control={control}
      defaultValue={companyData.nif ? companyData.nif : ''}
      render={({ field }) => {
        return (
          <>
            <InputLabel htmlFor='5'>NIF</InputLabel>
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
      defaultValue={companyData.cnae ? companyData.cnae : ''}
      render={({ field }) => {
        return (
          <>
            <InputLabel htmlFor='6'>CNAE</InputLabel>
            <FilledInput id='6' aria-describedby='company-cnae-helper' />
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
      defaultValue={companyData.sole ? companyData.sole : ''}
      render={({ field }) => {
        return (
          <FormControlLabel
            id='sole'
            label='Is the company owned by a sole shareholder?'
            labelPlacement='start'
            control={<Switch {...field} size='medium' />}
          />
        );
      }}
    />
  );
  const mgmt = (
    <Controller
      name='mgmt'
      control={control}
      defaultValue={companyData.mgmt ? companyData.mgmt : ''}
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
      defaultValue={companyData.mgmt_rem ? companyData.mgmt_rem : ''}
      render={({ field }) => {
        return (
          <FormControlLabel
            id='mgmt_rem'
            label='Does the company audit its accounts?'
            labelPlacement='start'
            control={<Switch {...field} size='medium' />}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {name}
          {type}
          {audit}
          {year_end}
          {nif}
          {cnae}
          {sole}
          {mgmt}
          {mgmt_rem}
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

// 1"name": "CODEWORKS",
// 2"type": "SL",
// 3"audit": false,
// 4"year_end": 3112,
// 5"nif": "B-78239152",
// 6"cnae": "5374",
// 7"sole": true,
// 8"mgmt": "S_D",
// 9"mgmt_rem": false
