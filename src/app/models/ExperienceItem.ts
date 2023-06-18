import {Item} from "./Item";
import {Skill} from "./Skill";

export class ExperienceItem extends Item {
  private _appliedSkills: Skill[];


  constructor(dateOfStart: string, dateOfEnd: string, location: string, description: string, appliedSkills: Skill[]) {
    super(dateOfStart, dateOfEnd, location, description);
    this._appliedSkills = appliedSkills;
  }


  get appliedSkills(): Skill[] {
    return this._appliedSkills;
  }

  set appliedSkills(value: Skill[]) {
    this._appliedSkills = value;
  }
}
