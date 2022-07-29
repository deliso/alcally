import { Action, Company } from '../../../../types/types';
import './CompanyDashboard.css';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import ActionCardItem from '../../Components/ActionCards/ActionCardItem';
import CompanyCard from '../../Components/CompanyCard/CompanyCard';
import { Grid, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

type Props = {};

const CompanyDashboard = (props: Props) => {
  const location = useLocation();
  const state = location.state as any;
  const company: Company = state.company;
  const { actions } = company;
  const Item = styled(Paper)(() => ({
    'background-color': 'transparent',
    height: '100%',
    textAlign: 'left',
    'margin-bottom': '8px',
    color: 'black',
  }));
  return (
    <>
      <div className='company-dashboard'>
        {company ? (
          <div className='dashboard-container'>
            <div className='cards-container-border'>
              <Grid spacing={8} className='action-cards-container'>
                {actions.map((action: Action) => (
                  <Item>
                    <ActionCardItem
                      key={action.id}
                      action={action}
                    ></ActionCardItem>
                  </Item>
                ))}
              </Grid>
            </div>
            <div className='cards-container-border'>
              <Box className='company-card-container'>
                <Item>
                  <CompanyCard company={company}></CompanyCard>
                </Item>
              </Box>
            </div>
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
