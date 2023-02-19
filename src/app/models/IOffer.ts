import {ICompany} from "./ICompany";

export interface IOffer {
  id?: string;
  title: string;
  description: string;
  skills: string[];
  company?: ICompany;
}
