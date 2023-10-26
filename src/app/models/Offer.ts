import { Company } from "./Company";

export interface Offer {
  title: string,
  description: string,
  skills: string[],
  company: Company,
  creationDate: number
}
