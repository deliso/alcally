import { Company, Action } from './types/types';

const parseAction = (company: Company, action: Action): Action => {
  //Consider using if statement instead
  switch (action.id) {
    case 1:
      action.due_date = company.end + 3;
      return action;
    default:
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
    _requirements: 'audit',
    _showAction: Action.prototype._showAction,
  },
];

const company1: Company = {
  id: 1,
  name: 'Company 1',
  audit: true,
  end: 6,
  actions: [],
};

actionArr.forEach((action) => {
  if (
    action._requirements &&
    action._showAction(company1, action._requirements)
  ) {
    const newAction: Action = Object.assign({}, action);
    parseAction(company1, newAction);
    company1.actions.push(newAction);
  }
});

console.log(company1);
