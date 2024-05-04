import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, delay, Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _http: HttpClient) {}
  loginUser(user: User): Observable<any> {
     return of({ success: 'User logged in successfully' }).pipe(delay(500));
  }

  registerUser(user: User): Observable<any> {
    return of({ success: 'User registered successfully' }).pipe(delay(500));
  }
}
