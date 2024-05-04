import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { UserModel } from './../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  selectedUser: any;
  usersData: UserModel[] = [
    {
      name: 'ahmed',
      id: 1,
      email: 'a@test.com',
      phone: 4353453543,
      status: 'active',
    },
    {
      name: 'omar',
      id: 2,
      email: 'a@test.com',
      phone: 372636722,
      status: 'active',
    },
    {
      name: 'ali',
      id: 3,
      email: 'c@test.com',
      phone: 82736,
      status: 'soft_deleted',
    },
  ];
  constructor(private http: HttpClient) {}

  getUsersData(): Observable<UserModel[]> {
    return of(this.usersData).pipe(delay(500));
  }

  saveNewUser(newUser: any) {
    return of({ success: 'New user added successfully' }).pipe(delay(500));
  }

  updateUser(userId: number, payload: any) {
    return of({ success: 'User updated successfully' }).pipe(delay(500));
  }

  deleteUser(userId: number) {
    return of({ success: 'User deleted successfully' }).pipe(delay(500));
  }
}
