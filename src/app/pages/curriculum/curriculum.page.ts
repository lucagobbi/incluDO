import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.page.html',
  styleUrls: ['./curriculum.page.scss'],
})
export class CurriculumPage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
