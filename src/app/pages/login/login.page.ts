import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  signIn() {
    this.authService.signInWithEmailAndPassword(this.credentials.getRawValue());
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

}
