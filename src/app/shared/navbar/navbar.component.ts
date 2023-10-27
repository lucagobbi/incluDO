import { Component, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {

  themeToggleDarkIcon!: HTMLElement;
  themeToggleLightIcon!: HTMLElement;

  constructor(
    private authService: AuthService,
    private navController: NavController,
    private elRef: ElementRef
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.themeToggleDarkIcon = this.elRef.nativeElement.querySelector('#theme-toggle-dark-icon');
    this.themeToggleLightIcon = this.elRef.nativeElement.querySelector('#theme-toggle-light-icon');

    // Initial state based on localStorage or system preference
    const isDark = localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      this.themeToggleLightIcon.classList.remove('hidden');
    } else {
      this.themeToggleDarkIcon.classList.remove('hidden');
    }
  }

  onThemeToggleClick() {
    this.themeToggleDarkIcon.classList.toggle('hidden');
    this.themeToggleLightIcon.classList.toggle('hidden');

    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    }
  }

  signOut() {
    this.authService.signOut();
  }

  goTo(route: string) {
    this.navController.navigateForward(route);
  }

}
