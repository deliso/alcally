class User {
  id!: number;
  email!: string;
  password!: string;
}

class Company {
  id!: number;
  name!: string;
  audit!: boolean;
  end!: number;
  actions!: Action[];
}

class Action {
  constructor(
    id: number,
    due_date: number,
    name: string,
    _requirements: keyof Company
  ) {
    this.id = id;
    this.due_date = due_date;
    this.name = name;
    this._requirements = _requirements;
    this._showAction;
  }
  id!: number;
  due_date!: number;
  name!: string;
  _requirements!: keyof Company;
  _showAction(company: Company, _requirements: keyof Company) {
    if (company[_requirements]) {
      return true;
    } else return false;
  }
}

export { User, Company, Action };
