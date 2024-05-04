import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import { MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import { CardsModule } from 'src/app/shared';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersContainerComponent } from './components/users-container/users-container.component';
import { UsersComponent } from './components/users/users.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    UsersContainerComponent,
    UsersComponent,
    NewUserComponent,
    UpdateUserComponent,
  ],
  imports: [
    CommonModule,
    UsersManagementRoutingModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    CardsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    FormsModule,
    TranslateModule,
    MatSnackBarModule,
  ],
})
export class UsersManagementModule {}
