import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {AutoLoginGuard} from "./guards/auto-login.guard";
import {OfferResolver} from "./services/resolvers/offer.resolver";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [AutoLoginGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create-offer/:type',
    loadChildren: () => import('./pages/offers/create-offer/create-offer.module').then( m => m.CreateOfferPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'offer/:id',
    loadChildren: () => import('./pages/offers/offer/offer.module').then(m => m.OfferPageModule),
    resolve: {
      offer: OfferResolver
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
