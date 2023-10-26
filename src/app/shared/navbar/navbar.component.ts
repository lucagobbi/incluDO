import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  constructor(
    private authService: AuthService,
    private navController: NavController
  ) { }

  ngOnInit() {}

  signOut() {
    this.authService.signOut();
  }

  goTo(route: string) {
    this.navController.navigateForward(route);
  }

}
