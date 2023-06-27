export interface Employee {
  _id?: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  address?: string;
  joined_at: string;
  salary: number;
  department: string;
  manager?: string;
}

export interface FormattedEmployee {
  _id?: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  address?: string;
  joined_at: string;
  salary?: string;
  department: string;
  manager?: string;
}
