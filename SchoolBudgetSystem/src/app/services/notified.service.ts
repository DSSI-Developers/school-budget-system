import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from './../../models/notified.model';

@Injectable({
  providedIn: 'root'
})
export class NotifiedService {
  notified: Notification[];

  constructor(private http:HttpClient) { }
  getNotified() {
    return this.http.get<{message: string, notification; any}>('http://localhost:8080/notification/getAllNotification')
  }


}
