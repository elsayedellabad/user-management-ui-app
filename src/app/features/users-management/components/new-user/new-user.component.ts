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
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit, OnDestroy {
  newUserForm: any;
  action = 'add';
  saving = false;
  loadingDetails = false;
  constructor(
    private router: Router,
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }
  /**
   * @desc This is the saveNewUser() function that save new user
   *
   */
  saveNewUser() {
    const payload = {
      name: this.newUserForm.value?.name,
      email: this.newUserForm.value?.email,
      phone: this.newUserForm.value?.phone,
      status: this.newUserForm.value?.status,
    };

    this.usersService.saveNewUser(payload).subscribe({
      next: (result) => {
        // console.log('@result >> ', result);
        this.usersService.usersData.push({
          id: this.usersService.usersData.length + 1,
          ...payload,
        });
        this.snackBar.open('User Added successfully', undefined, {
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
    this.router.navigateByUrl('/users-management/users');
  }

  back() {
    this.router.navigateByUrl('/users-management/users');
  }

  ngOnDestroy(): void {}
}
