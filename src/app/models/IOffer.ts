import {ICompany} from "./ICompany";
import {IApplication} from "./IApplication";

export interface IOffer {
  id?: string;
  title: string;
  description: string;
  skills: string[];
  company?: ICompany;
  applications?: IApplication[];
}
