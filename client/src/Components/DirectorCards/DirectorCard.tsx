import './DirectorCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { Director } from '../../../../types/types';

type Props = {
  director: Director;
  handleRemove: any;
};

const DirectorCard = (props: Props) => {
  const director: Director = props.director;
  const handleRemove = props.handleRemove;
  // const [overdue, setOverdue] = useState(false);
  // const dt = DateTime;
  // const action: Action = props.action;
  // const handleComplete: any = props.handleComplete;
  // const dueDate: number = dt
  //   .utc(action.due_year, action.due_month, action.due_day)
  //   .toFormat('MMMM dd, yyyy');
  // useEffect(() => {
  //   if (
  //     dt
  //       .utc(action.due_year, action.due_month, action.due_day)
  //       .toUnixInteger() < dt.now().toUnixInteger() &&
  //     !action.completed
  //   ) {
  //     setOverdue(true);
  //   }
  // }, []);
  const card = (
    <div>
      <CardContent>
        <Typography
          variant='caption'
          color='text.secondary'
          gutterBottom
          className='due-date'
        >
          Director
          {/* {overdue ? <Chip size='small' label='overdue' color='error' /> : ''} */}
        </Typography>
        <Typography variant='h6' component='div'>
          {director.name} {director.surname}
        </Typography>
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
