import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class NotificationsComponent implements OnInit {
  notification: Notification[] = [];
  private allNotification: Subscription;
  closeDialig: boolean;

  isLoading = false;
  private authStatusSub: Subscription;
  constructor(
    public notifiedService: NotifiedService,
    private userServices: UsersService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.userServices
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

    this.notifiedService.getAllNotified();
    this.allNotification = this.notifiedService
      .getNitifiedUpdateListener()
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

  // showNotification(from, align) {
  //   const type = ['', 'info', 'success', 'warning', 'danger'];

  //   const color = Math.floor(Math.random() * 4 + 1);

  //   $.notify(
  //     {
  //       icon: 'notifications',
  //       message:
  //         'Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer.',
  //     },
  //     {
  //       type: type[color],
  //       timer: 4000,
  //       placement: {
  //         from: 'top',
  //         align: 'right',
  //       },
  //       template:
  //         '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
  //         '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
  //         '<i class="material-icons" data-notify="icon">notifications</i> ' +
  //         '<span data-notify="title">{1}</span> ' +
  //         '<span data-notify="message">{2}</span>' +
  //         '<div class="progress" data-notify="progressbar">' +
  //         '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
  //         '</div>' +
  //         '<a href="{3}" target="{4}" data-notify="url"></a>' +
  //         '</div>',
  //     }
  //   );
  // }

  OnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
