import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { NotifiedService } from './../services/notified.service';
import { Notification } from './../../models/notified.model';
import { Subscription } from 'rxjs';
import { UsersService } from 'app/services/users.service';

declare var $: any;

// export interface Notification {
//   dateTime: string;
//   type: string;
//   status: string;
//   icon: string;
//   detail: string;
//   note: string;
// }

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NotificationsComponent implements OnInit {


  notification: Notification[] = [];
  private allNotification: Subscription;
  closeDialig: boolean;

  isLoading = false;
  private authStatusSub: Subscription;
  constructor(public notifiedService: NotifiedService, private userServices: UsersService) { }

  ngOnInit() {
    this.authStatusSub = this.userServices.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false
    });

    this.notifiedService.getAllNotified()
    this.allNotification =  this.notifiedService.getNitifiedUpdateListener()
    .subscribe((result: Notification[]) => {
      this.notification = result;
      // console.log('Result of notification : ', result);
      // this.notification$ = result.notification;
    });
  }

  closeNitification(id: string) {
    this.closeDialig = window.confirm('ต้องการลบการแจ้งเตือนนี้หรือไม่');
    if (this.closeDialig === true) {
      this.notifiedService.deleteNotified(id);
    } else {
      console.log(id);
    }
  }

  OnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}