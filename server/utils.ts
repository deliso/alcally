import { Company, Action } from '../types/types';

const actionArr: Action[] = [
  {
    id: 1,
    due_date: 3103,
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
    due_date: 3103,
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
    due_date: 3004,
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
    due_date: 3004,
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
    due_date: 3004,
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
    due_date: 3006,
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
    due_date: 3007,
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
    due_date: 3112,
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
      action.due_date = company.year_end + 3;
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
      company.actions.push(newAction);
    }
  });
};

export default insertActions;
