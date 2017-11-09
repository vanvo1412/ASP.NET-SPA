import { ProductLayoutComponent } from './layouts/product/product-layout.component';
import { AuthGuard } from './shared/auth-service/auth.guard';
import { CanActivate } from '@angular/router';
import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
  path: '',
  component: ProductLayoutComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'ecommerce',
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
