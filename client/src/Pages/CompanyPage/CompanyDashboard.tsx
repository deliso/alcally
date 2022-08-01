import { Action, Company, Director } from '../../../../types/types';
import './CompanyDashboard.css';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import ActionCardItem from '../../Components/ActionCards/ActionCardItem';
import CompanyCard from '../../Components/CompanyCard/CompanyCard';
import { Button, Grid, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import DirectorCard from '../../Components/DirectorCards/DirectorCard';
import { Link } from 'react-router-dom';
import DirectorForm from './DirectorForm';
const { DateTime } = require('luxon');

type Props = {};

const CompanyDashboard = (props: Props) => {
  const baseUrl = 'http://localhost:3001/';
  const location = useLocation();
  // const [company, setCompany] = useState<Company>();
  const [sortedActions, setSortedActions] = useState<Action[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  // const [complete, setComplete] = useState<boolean>(false);
  const state = location.state as any;
  const company: Company = state.company;
  const id: string = company.id;
  const dt = DateTime;
  const currentTime = new Date(Date.now());
  const filterActions = (actions: Action[]) => {
    return actions.filter((action) => {
      return (
        dt
          .utc(action.due_year, action.due_month, action.due_day)
          .toUnixInteger() <
        dt.utc(currentTime).toUnixInteger() + 31536000
      );
    });
  };

  const sortActions = (actions: Action[]) => {
    actions.sort((a, b) => {
      const aTimestamp: number = dt.utc(a.due_year, a.due_month, a.due_day);
      const bTimestamp: number = dt.utc(b.due_year, b.due_month, b.due_day);
      return aTimestamp - bTimestamp;
    });
    return filterActions(actions);
  };

  useEffect(() => {
    const getCompanyById: () => Promise<void> = async () => {
      const companyById = await fetch(`${baseUrl}company/${company.id}`);
      const jsonCompanyById = await companyById.json();
      const finalActions: Action[] = sortActions([...jsonCompanyById.actions]);
      setSortedActions([...finalActions]);
      setDirectors([...jsonCompanyById.directors]);
    };
    getCompanyById();
  }, []);
  const handleComplete = async (id: string) => {
    const updatedActions: Action[] = [...sortedActions].map(
      (action: Action) => {
        if (action.id === id) {
          const currentState = action.completed;
          return { ...action, completed: !currentState };
        }
        return action;
      }
    );

    setSortedActions([...updatedActions]);
    company.actions = [...updatedActions];
    const completeReq = await fetch(`http://localhost:3001/complete/${id}`, {
      method: 'PUT',
    });
  };
  const handleAddDirector = () => {
    setShowForm(true);
  };
  const Item = styled(Paper)(() => ({
    'background-color': 'transparent',
    height: '100%',
    textAlign: 'left',
    'margin-bottom': '8px',
    color: 'black',
  }));
  return (
    <>
      {showForm ? (
        <DirectorForm
          companyId={company.id}
          setShowForm={setShowForm}
        ></DirectorForm>
      ) : (
        <>
          <div className='company-dashboard'>
            {company ? (
              <div className='dashboard-container'>
                <div className='cards-container-border'>
                  <div className='cards-container-header'>
                    <span>UPCOMING ACTIONS</span>
                    <span>{sortedActions.length}</span>
                  </div>
                  <Grid spacing={8} className='action-cards-container'>
                    {sortedActions?.map((action: Action) => (
                      <Item>
                        <ActionCardItem
                          key={action.id}
                          action={action}
                          // complete={complete}
                          handleComplete={handleComplete}
                        ></ActionCardItem>
                      </Item>
                    ))}
                  </Grid>
                </div>
                <div className='cards-container-border'>
                  <Box className='director-card-container'>
                    <div className='cards-container-header'>
                      <span>DIRECTORS</span>

                      <Button
                        className='add-director-button'
                        variant='contained'
                        onClick={handleAddDirector}
                      >
                        ADD DIRECTOR
                      </Button>
                    </div>
                    <Grid spacing={8} className='director-cards-container'>
                      {directors.map((director: Director) => {
                        console.log(director);
                        return (
                          <Item>
                            <DirectorCard
                              key={director.id}
                              director={director}
                            ></DirectorCard>
                          </Item>
                        );
                      })}
                    </Grid>
                  </Box>
                </div>
                <div className='cards-container-border'>
                  <Box className='company-card-container'>
                    <div className='cards-container-header'>
                      <span>COMPANY DETAILS</span>
                    </div>
                    <CompanyCard company={company}></CompanyCard>
                  </Box>
                </div>
              </div>
            ) : (
              'Select or create a company'
            )}
          </div>
          <></>
        </>
      )}
    </>
  );
};
export default CompanyDashboard;
