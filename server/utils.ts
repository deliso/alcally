import { Company, Action } from './types/types';

const parseAction = (company: Company, action: Action): Action => {
  //Consider using if statement instead

  delete action._requirements;
  delete action._showAction;
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

const actionArr: Action[] = [
  {
    id: 1,
    due_date: 3,
    name: 'Action 1',
    _requirements: 'audit',
    _showAction: Action.prototype._showAction,
  },
  {
    id: 2,
    due_date: 6,
    name: 'Action 2',
    _requirements: 'name',
    _showAction: Action.prototype._showAction,
  },
];

const company1: Company = {
  id: 1,
  name: 'Company 1',
  type: 'SA',
  audit: true,
  year_end: 6,
  actions: [],
};

const insertActions = (company: Company) => {
  actionArr.forEach((action) => {
    if (
      action._requirements &&
      action._showAction &&
      action._showAction(company, action._requirements)
    ) {
      const newAction: Action = Object.assign({}, action);
      parseAction(company, newAction);
      console.log('Actions', company.actions);
      company.actions.push(newAction);
    }
  });
};

export default insertActions;
