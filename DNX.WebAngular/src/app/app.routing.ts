import { EcommerceLayoutComponent } from './layouts/ecommerce/ecommerce-layout.component';
import { AuthGuard } from './shared/auth-service/auth.guard';
import { CanActivate } from '@angular/router';
import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
  path: '',
  component: EcommerceLayoutComponent,
  children: [
  //   {
  //   path: '',
  //   loadChildren: './dashboard/dashboard.module#DashboardModule'
  // },
  {
    path: '',
    loadChildren: './ecommerce/ecommerce.module#EcommerceModule'
  }
]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionModule'
  }]
}, {
  path: '**',
  redirectTo: 'session/404'
}];
