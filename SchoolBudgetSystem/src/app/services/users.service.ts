import { Observable, observable, ObservedValueOf } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Users } from "./../../models/users.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}

  url_API: string = "http://localhost:8080";
  userData =  [];

  getAllUsers() {
    return this.http.get<{ message: string; users: any }>(
      `${this.url_API}/users/getAllUsers`
    );
  }

  deleteUser(userId: string) {
    this.http
      .delete(`${this.url_API}/users/deleteUser/+${userId}`)
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
    phone,
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
    console.log('User detail : ',user);
    // this.http
    //   .put(`${this.url_API}/users/verified/${id}`, user)
    //   .subscribe((response) => {
    //     console.log(response);
    //   });
  }

  getUserDetail(id) {

  }
}
