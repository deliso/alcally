import { Company, Action } from '../types/types';
const { DateTime } = require('luxon');

const actionArr: Action[] = [
  {
    id: 1,
    due_month: 3,
    due_day: 31,
    name: 'Approve draft Annual Accounts',
    completed: false,
    hidden: false,
    category: 'ACCOUNTS',
    frequency: 'YEARLY',
    _requirements: 'name',
    _insertAction: Action.prototype._insertAction,
  },
  {
    id: 2,
    due_month: 3,
    due_day: 31,
    name: 'Submit Annual Accounts for audit',
    completed: false,
    hidden: false,
    category: 'ACCOUNTS',
    frequency: 'YEARLY',
    _requirements: 'audit',
    _insertAction: Action.prototype._insertAction,
  },
  {
    id: 3,
    due_month: 4,
    due_day: 30,
    name: 'Submit Book of Minutes',
    completed: false,
    hidden: false,
    category: 'ACCOUNTS',
    frequency: 'YEARLY',
    _requirements: 'name',
    _insertAction: Action.prototype._insertAction,
  },
  {
    id: 4,
    due_month: 4,
    due_day: 30,
    name: 'Submit Registry Book of Shareholders',
    completed: false,
    hidden: false,
    category: 'ACCOUNTS',
    frequency: 'YEARLY',
    _requirements: 'name',
    _insertAction: Action.prototype._insertAction,
  },
  {
    id: 5,
    due_month: 4,
    due_day: 30,
    name: 'Submit Registry Book of Contracts with the Sole Shareholder',
    completed: false,
    hidden: false,
    category: 'ACCOUNTS',
    frequency: 'YEARLY',
    _requirements: 'mgmt',
    _insertAction: (company: Company, _requirements: keyof Company) => {
      if (company[_requirements] === 'S_SH') {
        return true;
      } else return false;
    },
  },
  {
    id: 6,
    due_month: 6,
    due_day: 30,
    name: 'Approve Annual Accounts',
    completed: false,
    hidden: false,
    category: 'ACCOUNTS',
    frequency: 'YEARLY',
    _requirements: 'name',
    _insertAction: Action.prototype._insertAction,
  },
  {
    id: 7,
    due_month: 7,
    due_day: 30,
    name: 'File Annual Accounts',
    completed: false,
    hidden: false,
    category: 'ACCOUNTS',
    frequency: 'YEARLY',
    _requirements: 'name',
    _insertAction: Action.prototype._insertAction,
  },
  {
    id: 8,
    due_month: 12,
    due_day: 31,
    name: 'Approve remuneration',
    completed: false,
    hidden: false,
    category: 'ACCOUNTS',
    frequency: 'YEARLY',
    _requirements: 'mgmt_rem',
    _insertAction: Action.prototype._insertAction,
  },
];

const parseAction = (company: Company, action: Action): Action => {
  //Consider using if statement instead

  delete action._requirements;
  delete action._insertAction;
  switch (action.id) {
    case 1:
      if (action.due_month + company.year_end_month <= 12) {
        action.due_month = action.due_month + company.year_end_month;
      } else {
        action.due_month = action.due_month + company.year_end_month - 12;
      }
      delete action.id;
      return action;
    default:
      delete action.id;
      return action;
  }
};

const insertActions = (company: Company) => {
  actionArr.forEach((action) => {
    if (
      action._requirements &&
      action._insertAction &&
      action._insertAction(company, action._requirements)
    ) {
      const newAction: Action = Object.assign({}, action);
      parseAction(company, newAction);
      console.log('Actions', company.actions);
      const currentYear = new Date(Date.now()).getFullYear();
      for (let i = currentYear; i < currentYear + 10; i++) {
        const datedAction: Action = Object.assign({}, newAction);
        datedAction.due_year = i;
        console.log(datedAction.due_year);
        company.actions.push({ ...datedAction });
      }
    }
  });
};

// const filterActionsByDate = () => {
//   const dt = DateTime;
//   currentTime = new Date(Date.now())
//   const
//   dt.
// };

export default insertActions;
