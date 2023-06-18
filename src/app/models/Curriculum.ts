import {User} from "./User";
import {Skill} from "./Skill";
import {EducationItem} from "./EducationItem";
import {ExperienceItem} from "./ExperienceItem";
import {Contact} from "./Contact";

export class Curriculum {
  private _user: User;
  private _intro: string;
  private _educationItems: EducationItem[];
  private _experienceItems: ExperienceItem[];
  private _skills: Skill[];
  private _contacts: Contact[];

  private _privacy: boolean;

  constructor(user: User, intro: string, educationItems: EducationItem[],
              experienceItems: ExperienceItem[], skills: Skill[], contacts: Contact[], privacy: boolean) {
    this._user = user;
    this._intro = intro;
    this._educationItems = educationItems;
    this._experienceItems = experienceItems;
    this._skills = skills;
    this._contacts = contacts;
    this._privacy = privacy;
  }


  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get intro(): string {
    return this._intro;
  }

  set intro(value: string) {
    this._intro = value;
  }

  get educationItems(): EducationItem[] {
    return this._educationItems;
  }

  set educationItems(value: EducationItem[]) {
    this._educationItems = value;
  }

  get experienceItems(): ExperienceItem[] {
    return this._experienceItems;
  }

  set experienceItems(value: ExperienceItem[]) {
    this._experienceItems = value;
  }

  get skills(): Skill[] {
    return this._skills;
  }

  set skills(value: Skill[]) {
    this._skills = value;
  }

  get contacts(): Contact[] {
    return this._contacts;
  }

  set contacts(value: Contact[]) {
    this._contacts = value;
  }

  get privacy(): boolean {
    return this._privacy;
  }

  set privacy(value: boolean) {
    this._privacy = value;
  }
}
