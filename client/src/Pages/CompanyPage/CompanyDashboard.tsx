import { Action, Company } from '../../../../types/types';
import './CompanyDashboard.css';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import ActionCardItem from '../../Components/ActionCards/ActionCardItem';

type Props = {};

const CompanyDashboard = (props: Props) => {
  const location = useLocation();
  const state = location.state as any;
  const { company } = state;
  const { name, type, actions } = company as Company;
  return (
    <>
      <div className='company-dashboard'>
        {company ? (
          <div className='dashboard-container'>
            <Box className='cards-container'>
              {actions.map((action: Action) => (
                <ActionCardItem
                  key={action.id}
                  action={action}
                ></ActionCardItem>
              ))}
            </Box>
            <Box>
              {name}, {type}
            </Box>
          </div>
        ) : (
          'Select or create a company'
        )}
      </div>
      <></>
    </>
  );
};
export default CompanyDashboard;
