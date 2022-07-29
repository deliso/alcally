import './CompanyCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { Company } from '../../../../types/types';

type Props = {
  company: Company;
};

const CompanyCard = (props: Props) => {
  // const company = useContext(selectedCompany) as Company;
  const company: Company = props.company;
  const card = (
    <>
      <CardContent>
        <Typography variant='caption' color='text.secondary' gutterBottom>
          Name
        </Typography>
        <Typography variant='h6' component='div'>
          {company.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>More Info</Button>
      </CardActions>
    </>
  );
  return (
    <Card className='company-card-item' variant='outlined'>
      {card}
    </Card>
  );
};

export default CompanyCard;
