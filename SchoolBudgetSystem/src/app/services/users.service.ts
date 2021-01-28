import { Router, ActivatedRoute } from '@angular/router';
import { Observable, observable, ObservedValueOf } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

// Model
import { AuthData } from './../../models/auth-data.model';
import { Users } from './../../models/users.model';

// RxJs lib
import { Subject } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private userId: string;

    constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar,) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  userLogin(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        'http://localhost:8080/users/authentication',
        authData
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['/home']);

            this._snackBar.open('ยินดีต้อนรับ', 'ปิด', {
              duration: 50000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    console.log('autoAtuthUser : ' , authInformation);
    if (!authInformation) {
      console.log(`Don't have authInformation infunction : getAuthData`);
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(`AuthoAutUser working now : ${now} , ${expiresIn}`);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    } else {
      this.logout();
      this.router.navigate(['/']);
        Swal.fire('Session Expired;', 'เซสชั่นหมดอายุ กรุณาเข้าสู่ระบบอีกครั้งครับ', 'info')
    }
  }


  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
      console.log('Now status you logout !');
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    console.log('Save alredy daya of user : saveAuthData !')
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    console.log('Clear Authentication data : clearAuthData');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    console.log(`Token : ${token}, expireationDate : ${expirationDate}, userId : ${userId} `);
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }

  userSignup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    position: string,
    department: string,
    role: string,
    avatar: string,
    permission: string
  ) {
    const userDatail = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      position: position,
      department: department,
      role: role,
      avatar: null,
      permission: permission,
    };
    this.http
      .post('http://localhost:8080/users/userRegister', userDatail)
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  getAllUsers() {
    return this.http.get<{ message: string; users: any }>(
      'http://localhost:8080/users/getAllUsers'
    );
  }

  deleteUser(userId: string) {
    this.http
      .delete('http://localhost:8080/users/deleteUser/' + userId)
      .subscribe((userDelete) => {
        console.log(userDelete);
      });
  }

  editUser(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    position: string,
    department: string,
    role: string,
    avatar: string,
    permission: string
  ) {
    const user = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      position: position,
      department: department,
      role: role,
      avatar: avatar,
      permission: permission,
    };
    console.log('User detail : ', user);
    // this.http
    //   .put(`${this.url_API}/users/verified/${id}`, user)
    //   .subscribe((response) => {
    //     console.log(response);
    //   });
  }

  getUserDetail(id: string) {
    // const userId = this.getUserId();
    // console.log(userId);
    return this.http.get<{ message: string, data: any}>('http://localhost:8080/users/getOneUser/' + id);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
}
