import './ActionCardItem.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { Action, Company } from '../../../../types/types';
const { DateTime } = require('luxon');

type Props = {
  key: string | number | undefined;
  action: Action;
};

const ActionCardItem = (props: Props) => {
  const [overdue, setOverdue] = useState(false);
  const dt = DateTime;
  // const company = useContext(selectedCompany) as Company;
  const action: Action = props.action;
  const dueDate: number = dt
    .utc(action.due_year, action.due_month, action.due_day)
    .toFormat('MMMM dd, yyyy');
  useEffect(() => {
    if (
      dt
        .utc(action.due_year, action.due_month, action.due_day)
        .toUnixInteger() < dt.now().toUnixInteger()
    ) {
      setOverdue(true);
    }
  }, []);
  const card = (
    <div className={overdue ? 'overdue' : ''}>
      <CardContent>
        <Typography variant='caption' color='text.secondary' gutterBottom>
          {dueDate}
        </Typography>
        <Typography variant='h6' component='div'>
          {action.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Mark Complete</Button>
      </CardActions>
    </div>
  );
  return (
    <Card className='action-card-item' variant='outlined'>
      {card}
    </Card>
  );
};

export default ActionCardItem;
