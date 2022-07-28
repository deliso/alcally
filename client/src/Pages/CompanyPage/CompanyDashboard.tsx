import React from 'react';
import { Action, Company } from '../../../../types/types';
import './CompanyDashboard.css';
import { useLocation } from 'react-router-dom';

type Props = {};

const CompanyDashboard = (props: Props) => {
  const location = useLocation();
  const state = location.state as Company;
  const company = state;
  return (
    <div className='company-dashboard'>
      {company ? (
        <div>
          <div>{company.name}</div>
          <div>
            {company.actions.map((action: Action) => (
              <div key={action.id}>{action.name}</div>
            ))}
          </div>
        </div>
      ) : (
        'Select or create a company'
      )}
    </div>
  );
};
export default CompanyDashboard;
