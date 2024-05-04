import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AdminUserGuard } from 'src/app/core';
import { UsersContainerComponent } from './components/users-container/users-container.component';
import { UsersComponent } from './components/users/users.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersContainerComponent,
    children: [
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: 'new-user',
        component: NewUserComponent,
        canActivate: [AdminUserGuard],
      },
      {
        path: 'update-user',
        component: UpdateUserComponent,
        canActivate: [AdminUserGuard],
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersManagementRoutingModule {}
