import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard, PageNotFoundComponent } from './core';
import { AdminUserGuard } from './core/guards/admin-user.guard';
import { NormalUserGuard } from './core/guards/normal-user.guard';

const appRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/users-management/users-management.module').then(
        (m) => m.UsersManagementModule
      ),
  },
  {
    path: 'auth',
    canActivate: [],
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'users-management',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/users-management/users-management.module').then(
        (m) => m.UsersManagementModule
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
