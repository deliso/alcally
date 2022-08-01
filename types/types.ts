class User {
  id!: string;
  email!: string;
  password!: string;
}

type CompanyType = 'SA' | 'SL';
type Body = 'BOD' | 'J_D' | 'J_S_D' | 'S_D' | 'SH' | 'S_SH' | 'AU';

class Company {
  id!: string;
  name!: string;
  type!: CompanyType;
  audit!: boolean;
  year_end_month!: number;
  year_end_day!: number;
  actions!: Action[];
  directors?: Director[];
  nif!: string;
  cnae!: number;
  sole!: boolean;
  mgmt!: Body;
  mgmt_rem!: boolean;
  mgmt_num!: number;
}

class Director {
  id!: string;
  name!: string;
  surname!: string;
  role!: Role;
  body!: Body;
  active!: boolean;
  appointment_year!: number;
  appointment_month!: number;
  appointment_day!: number;
  expiry_year!: number;
  expiry_month!: number;
  expiry_day!: number;
  nif!: string;
  dir_rem!: boolean;
}

type Category = 'ACCOUNTS' | 'BOOKS' | 'APPOINTMENT';
type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
type Role = 'DIRECTOR' | 'CHAIRMAN' | 'SECRETARY';

// type DueDate = {
//   [key: string]: string | number | number[] | boolean | null;
//   year: string;
//   month: string;
//   day: string;
// };

class Action {
  constructor(
    id: string | number,
    due_year: number,
    due_month: number,
    due_day: number,
    name: string,
    completed: boolean,
    hidden: boolean,
    category: Category,
    frequency: Frequency,
    _requirements: keyof Company
  ) {
    this.id = id;
    this.due_year = due_year;
    this.due_month = due_month;
    this.due_day = due_day;
    this.name = name;
    this.completed = completed;
    this.hidden = hidden;
    this.category = category;
    this.frequency = frequency;
    this._requirements = _requirements;
    this._insertAction;
  }
  id?: string | number;
  due_year?: number;
  due_month!: number;
  due_day!: number;
  name!: string;
  completed!: boolean;
  hidden!: boolean;
  category!: Category;
  frequency!: Frequency;
  _requirements?: keyof Company;
  _insertAction?(company: Company, _requirements: keyof Company) {
    if (company[_requirements]) {
      return true;
    } else return false;
  }
}

export { User, Company, Action, Director };
