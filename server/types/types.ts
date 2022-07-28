class User {
  id!: number;
  email!: string;
  password!: string;
}

class Company {
  id!: number;
  name!: string;
  type!: CompanyType;
  audit!: boolean;
  year_end!: number;
  actions!: Action[];
}

type CompanyType = 'SA' | 'SL';

class Action {
  constructor(
    id: number,
    due_date: number,
    name: string,
    // company: Company,
    // companyId: number,
    _requirements: keyof Company
  ) {
    this.id = id;
    this.due_date = due_date;
    this.name = name;
    // this.company = company;
    // this.companyId = companyId;
    this._requirements = _requirements;
    this._showAction;
  }
  id?: number;
  due_date!: number;
  name!: string;
  // company?: Company;
  // companyId?: number;
  _requirements?: keyof Company;
  _showAction?(company: Company, _requirements: keyof Company) {
    if (company[_requirements]) {
      return true;
    } else return false;
  }
}

export { User, Company, Action };
