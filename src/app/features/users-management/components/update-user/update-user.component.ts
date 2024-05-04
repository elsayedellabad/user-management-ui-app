import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/* eslint-disable */

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit, OnDestroy {
  updateUserForm: any;
  action = 'update';
  saving = false;
  loadingDetails = false;
  constructor(
    private router: Router,
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setUpdateFormValues();
  }

  initForm() {
    this.updateUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  setUpdateFormValues() {
    if (!this.usersService.selectedUser) {
      this.goToUsersListing();
    }
    this.updateUserForm
      .get('name')
      .setValue(this.usersService?.selectedUser?.name);
    this.updateUserForm
      .get('email')
      .setValue(this.usersService?.selectedUser?.email);
    this.updateUserForm
      .get('phone')
      .setValue(this.usersService?.selectedUser?.phone);
    this.updateUserForm
      .get('status')
      .setValue(this.usersService?.selectedUser?.status);
  }
  /**
   * @desc This is the updateUser() function that update user
   *
   */
  updateUser() {
    const payload = {
      id: this.usersService?.selectedUser?.id,
      name: this.updateUserForm.value?.name,
      email: this.updateUserForm.value?.email,
      phone: this.updateUserForm.value?.phone,
      status: this.updateUserForm.value?.status,
    };

    this.usersService
      .updateUser(this.usersService?.selectedUser?.id, payload)
      .subscribe({
        next: (result) => {
          // console.log('@result >> ', result);
          var foundIndex = this.usersService.usersData.findIndex(
            (x) => x.id == this.usersService?.selectedUser?.id
          );
          this.usersService.usersData[foundIndex] = payload;
          this.snackBar.open('User Updated successfully', undefined, {
            duration: 5000,
            panelClass: ['success-snackbar'],
          });
          this.goToUsersListing();
        },
        error: (e) => {
          console.log(e.error['message']);
        },
      });
  }

  goToUsersListing() {
    this.router.navigateByUrl('users-management/users');
  }

  back() {
    this.router.navigateByUrl('users-management/users');
  }

  ngOnDestroy(): void {}
}
