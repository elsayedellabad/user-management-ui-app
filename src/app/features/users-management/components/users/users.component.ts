import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { emptyCardData, SpinnerService } from 'src/app/shared';
import { LocalStorageService } from 'src/app/core';
import { UsersService } from '../../services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from './../../models/user.model';
import { MatSort, Sort } from '@angular/material/sort';
import { CommonService } from 'src/app/shared/services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'status',
    'actions',
  ];
  users: UserModel[] = [];
  dataSource = new MatTableDataSource();
  length: number = 0;
  pageIndex: number | undefined = 1;
  pageSize: number | undefined = 6;
  previousPageIndex: number | undefined = 0;
  filterUsers: any;
  token;
  activeLanguage = 'en';
  constructor(
    private usersService: UsersService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {
    this.token = this.localStorageService.get('token');
    if (this.token == 'user') {
      this.displayedColumns = ['id', 'name', 'email', 'phone', 'status'];
    }
  }

  ngOnInit(): void {
    this.getUsersData();
    this.activeLanguage = this.translateService.currentLang;
    this.translateService.onLangChange.subscribe((res) => {
      this.activeLanguage = res.lang;
    });
  }

  /**
   * @desc This is the getUsersData() function that get's user data
   *
   */
  public getUsersData() {
    this.usersService.getUsersData().subscribe({
      next: (result: UserModel[]) => {
        // console.log('@result >> ', result);
        this.length = result.length;
        this.users = result;
        this.dataSource.data = result;
        this.getServerData({
          length: this.length,
          pageIndex: 0,
          pageSize: 6,
          previousPageIndex: this.previousPageIndex,
        });
      },
      error: (e) => {
        console.log(e.error['message']);
      },
    });
  }

  /**
   * @desc This is the getServerData function handle pagination for Users
   * @param {PageEvent} event
   * @returns {PageEvent} event
   */
  public getServerData(event: PageEvent) {
    if (this.users && Array.isArray(this.users)) {
      if (event.pageIndex == 0)
        this.dataSource.data = this.users.slice(0, event.pageSize);
      else
        this.dataSource.data = this.users.slice(
          event.pageIndex * event.pageSize,
          (event.pageIndex + 1) * event.pageSize
        );
    } else {
      console.error('this.users is not an array');
      this.dataSource.data = [];
    }
    this.pageIndex = event?.pageIndex;
    this.pageSize = event?.pageSize;
    this.previousPageIndex = event?.previousPageIndex;

    return event;
  }

  /**
   * @desc This is the deleteUser() function that delete single user
   *
   */
  deleteUser(userId: number) {
    this.usersService.deleteUser(userId).subscribe({
      next: (result) => {
        let userObj = this.users.filter((el) => el.id == userId);
        userObj[0].status = 'soft_deleted';
        var foundIndex = this.usersService.usersData.findIndex(
          (x) => x.id == userId
        );
        this.usersService.usersData[foundIndex] = userObj[0];

        this.getServerData({
          length: this.length,
          pageIndex: 0,
          pageSize: 6,
          previousPageIndex: this.previousPageIndex,
        });
        this.snackBar.open('User deleted successfully', undefined, {
          duration: 5000,
          panelClass: ['success-snackbar'],
        });
        // this.commonService.successMessage('User Deleted Successfully!');
        console.log('User Deleted Successfully!');
      },
      error: (e) => {
        console.log(e.error['message']);
      },
    });
  }

  /**
   * @desc This is the updateUser() function that open update user form
   *
   */
  updateUser(user: any) {
    this.usersService.selectedUser = user;
    this.router.navigateByUrl('/users-management/users/update-user');
  }

  /**
   * @desc This is the openAddNewUser() function that open add new user form
   *
   */
  openAddNewUser() {
    this.router.navigateByUrl('/users-management/users/new-user');
  }
  /**
   * Fix
   */
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  /**
   * @desc This is the applySearchFilter() function that apply search filter on users data
   *
   */
  applySearchFilter() {
    this.dataSource.data = this.users;
    this.dataSource.filter = this.filterUsers.trim().toLowerCase();
  }
}
