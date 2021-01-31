import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from './../../models/notified.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotifiedService {
  private notified: Notification[] = [];
  private notifiedUpdate = new Subject<Notification[]>();

  constructor(private http: HttpClient) {}
  getAllNotified() {
    return this.http
      .get<{ message: string; notification; any }>(
        'http://localhost:8080/notification/getAllNotification'
      )
      .subscribe((notified) => {
        this.notified = notified.notification;
        this.notifiedUpdate.next([...this.notified]);
      });
  }

  getNitifiedUpdateListener() {
    return this.notifiedUpdate.asObservable();
  }

  // getNotified(id: string) {
  //   return { ...this.notified.filter((data) => data._id === id) };
  // }

  // "type": "ครุภัณฑ์",
  // "status": "กำลังดำเนินการ",
  // "detail": "เอกสารโครงการของคุณกำลังอยู่ในระหว่างการดำเนินการ",
  // "note": "ไม่มีหมายเหตุ",
  addNotification(
    type: string,
    status: string,
    detail: string,
    note: string
  ) {
    const notification = {
      id: null,
      type: type,
      status: status,
      detail: detail,
      note: note
    }

    this.http.post<{message: string, notification: any}>('http://localhost:8080/notification/pushNotification', notification)
    .subscribe((respondata) => {
      console.log(respondata);
    })
  }



  deleteNotified(id: string) {
    console.log(id + 'In Service file');
    this.http
      .delete('http://localhost:8080/notification/deleteOneNotification/' + id)
      .subscribe(() => {
        const updateDataNotified = this.notified.filter(
          (data) => data._id !== id
        );
        this.notified = updateDataNotified;
        this.notifiedUpdate.next([...this.notified]);
      });
  }


}
