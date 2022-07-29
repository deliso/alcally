import './CompanyForm.css';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

type Props = {};

const CompanyForm = (props: Props) => {
  return (
    <div className='form-container'>
      <FormControl className='form-control'>
        <InputLabel htmlFor='my-input'>Email address</InputLabel>
        <Input id='my-input' aria-describedby='my-helper-text' />
        <FormHelperText id='my-helper-text'>
          We'll never share your email.
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default CompanyForm;
