import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TitleCasePipe} from "@angular/common";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../models/User";
import {EducationItem} from "../../models/EducationItem";
import {Skill} from "../../models/Skill";
import {Contact} from "../../models/Contact";
import {ExperienceItem} from "../../models/ExperienceItem";
import {I18nService} from "../i18n/i18n.service";

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private http: HttpClient, private formBuilder: FormBuilder,
              private i18nService: I18nService, private titleCase: TitleCasePipe) {}

  // generateCv(curriculum: Curriculum, picture: any) {
  //   let doc = new jsPDF();
  //   let img = this.createImage(picture);
  //   let loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id eros turpis. Vivamus tempor urna vitae sapien mollis molestie. Vestibulum in lectus non enim bibendum laoreet at at libero. Etiam malesuada erat sed sem blandit in varius orci porttitor. Sed at sapien urna. Fusce augue ipsum, molestie et adipiscing at, varius quis enim. Morbi sed magna est, vel vestibulum urna. Sed tempor ipsum vel mi pretium at elementum urna tempor. Nulla faucibus consectetur felis, elementum venenatis mi mollis gravida. Aliquam mi ante, accumsan eu tempus vitae, viverra quis justo.\n\nProin feugiat augue in augue rhoncus eu cursus tellus laoreet. Pellentesque eu sapien at diam porttitor venenatis nec vitae velit. Donec ultrices volutpat lectus eget vehicula. Nam eu erat mi, in pulvinar eros. Mauris viverra porta orci, et vehicula lectus sagittis id. Nullam at magna vitae nunc fringilla posuere. Duis volutpat malesuada ornare. Nulla in eros metus. Vivamus a posuere libero.'
  //   let margin = 0.5;
  //   doc.setLineWidth(1/72).line(margin, margin, margin, 11 - margin).line(8.5 - margin, margin, 8.5 - margin, 11 - margin);
  //
  //   doc.splitTextToSize(loremipsum, 7.5)
  //
  //   // Set the background color of the left column
  //   doc.setFillColor(26, 83, 161);
  //   doc.rect(20, 20, 60, 260, 'F');
  //
  //   // Add the user's image to the left column
  //   doc.addImage(img, 'JPG', 25, 25, 50, 50);
  //
  //   // Set the text color to white
  //   doc.setTextColor(255, 255, 255);
  //
  //   // Add the user's name to the left column
  //   doc.setFontSize(22);
  //   doc.text(curriculum.user.name + ' ' + curriculum.user.surname, 25, 90);
  //
  //   // Add the user's contact information to the left column
  //   doc.setFontSize(12);
  //   doc.text(this.getText('user.dateOfBirth', curriculum.user.dateOfBirth), 25, 100);
  //   doc.text(this.getText('user.email', curriculum.user.email), 25, 110);
  //   doc.text(this.getText('user.phoneNumber', curriculum.user.phoneNumber), 25, 120);
  //   doc.text(this.getText('user.address', curriculum.user.address), 25, 130);
  //
  //   // // Add the user's work experience to the left column
  //   // doc.setFontSize(20);
  //   // doc.text('Work Experience', 25, 140);
  //   // doc.setFontSize(16);
  //   // for (var i = 0; i < userWorkExperience.length; i++) {
  //   //   doc.text(userWorkExperience[i], 25, 150 + (i * 10));
  //   // }
  //
  //   doc.setTextColor(0, 0, 0, 90);
  //
  //   doc.setFontSize(9);
  //
  //   doc.text(this.getText('privacy', curriculum.user.address), 85, 275);
  //
  //   // Save the PDF
  //   doc.save('cv.pdf');
  //
  //
  // }

  createImage(data: any): HTMLImageElement {
    let blob = new Blob([data], { type: 'application/octet-stream'});
    let img = new Image();
    let imgUrl = URL.createObjectURL(blob);
    img.src = imgUrl;
    return img;
  }

  getText(label: string, data: string) {
    let msg = this.i18nService.getTranslation(label);
    return msg + ': ' + data;
  }

  getUserIntro(userFormGroup: FormGroup): string {
    return userFormGroup.get('intro')?.value;
  }

  collectUserData(userFormGroup: FormGroup): User {
    const user = new User(
      userFormGroup.get('name')?.value,
      userFormGroup.get('surname')?.value,
      userFormGroup.get('dateOfBirth')?.value,
      userFormGroup.get('email')?.value,
      userFormGroup.get('phoneNumber')?.value,
      userFormGroup.get('address')?.value,
    );
    return user;
  }

  collectEducationData(educationItemsAsFormGroupArray: FormGroup[]): EducationItem[] {
    const educationItems = new Array();
    educationItemsAsFormGroupArray.forEach(educationItemFormGroup => {
      const educationItem = new EducationItem(
        educationItemFormGroup.get('dateOfStart')?.value,
        educationItemFormGroup.get('dateOfEnd')?.value,
        educationItemFormGroup.get('location')?.value,
        educationItemFormGroup.get('description')?.value,
        educationItemFormGroup.get('field')?.value,
        educationItemFormGroup.get('title')?.value,
        educationItemFormGroup.get('graduation')?.value
      );
      educationItems.push(educationItem);
    })
    return educationItems;
  }

  collectSkillsData(skillsAsFormGroupArray: FormGroup[]): Skill[] {
    const skills = new Array();
    skillsAsFormGroupArray.forEach(skillFormGroup => {
      const skill = new Skill(
        skillFormGroup.get('title')?.value,
        skillFormGroup.get('level')?.value
      );
      skills.push(skill)
    });
    return skills;
  }

  collectExperienceData(experienceItemsAsFormGroupArray: FormGroup[]): ExperienceItem[] {
    const experienceItems = new Array();
    experienceItemsAsFormGroupArray.forEach(experienceItemFormGroup => {
      const experienceItem = new ExperienceItem(
        experienceItemFormGroup.get('dateOfStart')?.value,
        experienceItemFormGroup.get('dateOfEnd')?.value,
        experienceItemFormGroup.get('location')?.value,
        experienceItemFormGroup.get('description')?.value,
        experienceItemFormGroup.get('appliedSkills')?.value
      );
      experienceItems.push(experienceItem);
    });
    return experienceItems;
  }

  collectContactData(contactsAsFormGroupArray: FormGroup[]): Contact[] {
    const contacts = new Array();
    contactsAsFormGroupArray.forEach(contactFormGroup => {
      const contact = new Contact(
        contactFormGroup.get('social')?.value,
        contactFormGroup.get('link')?.value
      );
      contacts.push(contact);
    });
    return contacts;
  }

  buildUserFromGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['Mario'],
      surname: ['Rossi'],
      dateOfBirth: [new Date()],
      email: ['mariorossi@mail.it'],
      phoneNumber: ['333224579'],
      address: ['Via della Spiga 7, Milano, 20121'],
      intro: ['Sviluppatore software, full-stack developer']
    })
  }

  buildEducationFormGroup(): FormGroup {
    return this.formBuilder.group({
      educationItems: this.formBuilder.array([
        this.formBuilder.group({
          dateOfStart: [new Date()],
          dateOfEnd: [new Date()],
          location: ['Milano, Università degli studi'],
          description: ['Laurea in scienze informatiche'],
          field: ['Scienze informatiche'],
          title: ['Dottore in scienze informatiche'],
          graduation: ['102/110']
        })
      ]),
    })
  }

  buildSkillsFormGroup(): FormGroup {
    return this.formBuilder.group({
      skills: this.formBuilder.array([
        this.formBuilder.group({
          title: ['Java'],
          level: [87],
          confirmed: [false]
        })
      ])
    })
  }

  buildExperienceItemsFormGroup(): FormGroup {
    return this.formBuilder.group({
      experienceItems: this.formBuilder.array([
        this.formBuilder.group({
          dateOfStart: [new Date()],
          dateOfEnd: [new Date()],
          location: ['Accenture, Milano'],
          description: ['BE developer'],
          appliedSkills: [[]]
        })])
    })
  }

  buildContactsFormGroup(): FormGroup {
    return this.formBuilder.group({
      contacts: this.formBuilder.array([
        this.formBuilder.group({
          social: ['Linkedin'],
          link: ['www.linkedin.it/mariorossi']
        })
      ])
    })
  }

}
