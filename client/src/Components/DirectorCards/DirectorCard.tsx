import './DirectorCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { Director } from '../../../../types/types';
import { LinearProgress } from '@mui/material';
import { DateTime } from 'luxon';

type Props = {
  director: Director;
  handleRemove: any;
};

const DirectorCard = (props: Props) => {
  const director: Director = props.director;
  const handleRemove = props.handleRemove;
  const [progress, setProgress] = useState<number>(100);
  const [days, setDays] = useState<number>(0);

  const dt = DateTime;
  // const action: Action = props.action;
  // const handleComplete: any = props.handleComplete;
  // const dueDate: number = dt
  //   .utc(action.due_year, action.due_month, action.due_day)
  //   .toFormat('MMMM dd, yyyy');
  useEffect(() => {
    if (director.expiry_year && director.expiry_month && director.expiry_day) {
      const remainingTime =
        dt
          .utc(director.expiry_year, director.expiry_month, director.expiry_day)
          .toUnixInteger() - dt.now().toUnixInteger();
      const remainingDays = Math.floor(remainingTime / 86400);
      setDays(remainingDays);
      if (remainingTime < 31536000) {
        const progressOutput = (remainingDays / 100) * 10;
        setProgress(progressOutput);
      }
    }
  }, []);
  const card = (
    <div>
      <CardContent>
        <Typography
          variant='overline'
          color='text.secondary'
          gutterBottom
          className='due-date'
        >
          {director.role}
        </Typography>
        <Typography variant='h6' component='div' gutterBottom>
          {director.name} {director.surname}
        </Typography>
        <Typography
          variant='overline'
          color='text.secondary'
          className='due-date'
        >
          Expires in {days} days
        </Typography>
        <LinearProgress variant='determinate' value={progress} />
      </CardContent>
      <CardActions>
        <Button
          size='small'
          color='success'
          // onClick={() => handleComplete(action.id)}
        >
          Renew
        </Button>
        <Button onClick={() => handleRemove(director.id)()} size='small'>
          Remove
        </Button>
      </CardActions>
    </div>
  );
  return (
    <Card className='action-card-item' variant='outlined'>
      {card}
    </Card>
  );
};

export default DirectorCard;
