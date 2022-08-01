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

  const dt = DateTime;
  // const action: Action = props.action;
  // const handleComplete: any = props.handleComplete;
  // const dueDate: number = dt
  //   .utc(action.due_year, action.due_month, action.due_day)
  //   .toFormat('MMMM dd, yyyy');
  useEffect(() => {
    if (
      director.expiry_year &&
      director.expiry_month &&
      director.expiry_day &&
      dt
        .utc(director.expiry_year, director.expiry_month, director.expiry_day)
        .toUnixInteger() <
        dt.now().toUnixInteger() + 31536000
    ) {
      const remainingTime =
        dt.now().toUnixInteger() +
        31536000 -
        dt
          .utc(director.expiry_year, director.expiry_month, director.expiry_day)
          .toUnixInteger();
      const remainingDays = remainingTime / 86400;
      const progressOutput = (remainingDays / 100) * 10;
      setProgress(progressOutput);
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
          Director
        </Typography>
        <Typography variant='h6' component='div' gutterBottom>
          {director.name} {director.surname}
        </Typography>
        <Typography
          variant='overline'
          color='text.secondary'
          className='due-date'
        >
          Expires in 10 days
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
